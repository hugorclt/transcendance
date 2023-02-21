import { uid } from 'rand-token';
import {
  ForbiddenException,
  Injectable,
  Response,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LocalLogDto, LocalRegisterDto } from './dto/log-user.dto';
import { GoogleTokenDto, GoogleLogDto } from './dto/google-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { exclude } from '../utils/exclude';
import { ReturnUserEntity } from 'src/users/entities/return-user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginTicket, OAuth2Client } from 'google-auth-library';
import { Type } from '@prisma/client';
import { Api42LogDto, Api42CodeDto } from './dto/api42-log.dto';
import { HttpService } from '@nestjs/axios';

const googleClient = new OAuth2Client(
  process.env['GOOGLE_CLIENT_ID'],
  process.env['GOOGLE_CLIENT_SECRET'],
);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  /* ---------------------------------- Local --------------------------------- */
  async createNewLocalAccount(
    credentials: LocalRegisterDto,
  ): Promise<ReturnUserEntity> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(credentials.password, salt);

    return this.usersService.create({
      username: credentials.username,
      email: credentials.email,
      password: hash,
    });
  }
  /* ----------------------------------- 42 ----------------------------------- */
  async handle42Login(
    api42CodeDto: Api42CodeDto,
    @Response({ passthrough: true }) res,
  ): Promise<any> {
    console.log('received 42 login request');
    console.log(api42CodeDto.code);
    //----- CHECK FOR CODE AUTHENTICITY BY POSTING CODE TO GET ACCESS TOKEN -----
    const check = checkCodeAuthenticity({ code: api42CodeDto.code });
    if (!check) {
      console.log('code is invalid');
      throw new UnauthorizedException();
    }
    try {
      const user = await this.usersService.findOne42User('');
      console.log('found 42 user in db');
      return this.login(user, res);
    } catch (err) {
      console.log('creating new 42 user in db');
      const user = await this.usersService.create42({
        email: '',
        username: '',
        password: 'none',
        type: Type.API42,
      });
      return this.login(user, res);
    }
  }

  /* --------------------------------- google --------------------------------- */
  async handleGoogleLogin(
    googleTokenDto: GoogleTokenDto,
    @Response({ passthrough: true }) res,
  ): Promise<any> {
    //----- CHECK AUTHENTICITY OF GOOGLE TOKENID -----
    const ticket = await this.checkGoogleToken(googleTokenDto.token);
    const payload = ticket.getPayload();
    try {
      const user = await this.usersService.findOneGoogleUser(payload.email);
      return this.login(user, res);
    } catch (err) {
      const user = await this.usersService.createGoogle({
        email: payload.email,
        username: payload.name,
        password: 'none',
        type: Type.GOOGLE,
      });
      return this.login(user, res);
    }
  }

  /* ------------------------------- validation ------------------------------- */
  async validateUser(localLogDto: LocalLogDto): Promise<ReturnUserEntity> {
    const user = await this.prisma.user.findFirst({
      where: { username: localLogDto.username, type: Type.LOCAL },
    });

    if (user) {
      const passMatches = await bcrypt.compare(
        localLogDto.password,
        user.password,
      );
      if (!passMatches) {
        return null;
      } else {
        return exclude(user, ['password']);
      }
    }
    return null;
  }

  /* ---------------------------------- login --------------------------------- */
  async login(user: any, @Response({ passthrough: true }) res) {
    const tokens = await this.getTokens(user.id, user.username);
    res.cookie('jwt', tokens.refresh_token, {
      expires: true,
      maxAge: 7 * 24 * 3600000,
      httpOnly: true,
    });

    this.updateRefreshHash(user.id, tokens.refresh_token);
    return { access_token: tokens.access_token };
  }

  /* --------------------------------- logout --------------------------------- */
  async logout(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        refreshToken: {
          not: null,
        },
      },
      data: {
        refreshToken: null,
      },
    });
  }

  /* ------------------------------ refresh_token ----------------------------- */
  async refreshToken(
    userId: string,
    rt: string,
    @Response({ passthrough: true }) res,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.refreshToken)
      throw new UnauthorizedException('Access Denied');

    const rtMatches = await bcrypt.compare(rt, user.refreshToken);
    if (!rtMatches) throw new UnauthorizedException('Access Denied');

    const newAt = await this.jwtService.signAsync({
      sub: userId,
      username: user.username,
    });
    return { access_token: newAt };
  }

  /* -------------------------------------------------------------------------- */
  /*                               utilyFunctions                               */
  /* -------------------------------------------------------------------------- */
  async getTokens(userId: string, username: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync({
        sub: userId,
        username,
      }),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env['RT_SECRET'],
          expiresIn: 7 * 24 * 3600000,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRefreshHash(userId: string, rt: string) {
    const hash = await bcrypt.hash(rt, 10);
    this.usersService.updateRefreshToken(userId, hash);
  }

  async checkGoogleToken(token: string): Promise<LoginTicket> {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env['GOOGLE_CLIENT_ID'],
    });
    if (!ticket) throw new UnauthorizedException();
    return ticket;
  }
}
