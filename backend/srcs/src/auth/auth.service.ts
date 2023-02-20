import { uid } from 'rand-token';
import { ForbiddenException, Injectable, Response, UnauthorizedException } from '@nestjs/common';
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
      // bcrypt.compare(localLogDto.password, user.password, function(err, result){
      //     if (result)
      //         return exclude(user, ['password'])
      //     else
      //         //failure
      // });
      return exclude(user, ['password']);
    }
    //else
    return null;
  }

  /* ---------------------------------- login --------------------------------- */
  async login(user: any, @Response({ passthrough: true }) res) {
    const tokens = await this.getTokens(user.id, user.username)
    res.cookie('jwt', tokens.refresh_token, { expires: true, maxAge: 7 * 24 * 3600000, httpOnly: true });
    
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
      }
    })
  }

  /* ------------------------------ refresh_token ----------------------------- */
  async refreshToken(userId: string, rt: string, @Response({ passthrough: true }) res) {
    const user = await this.prisma.user.findUnique({
      where : {
        id: userId,
      }
    })
    if (!user) 
      throw new ForbiddenException("Access Denied");
    
    const rtMatches = bcrypt.compare(rt, user.refreshToken);
    if (!rtMatches)
      throw new ForbiddenException("Access Denied");

    return this.login(user, res);
  }

  /* -------------------------------------------------------------------------- */
  /*                               utilyFunctions                               */
  /* -------------------------------------------------------------------------- */
  async getTokens(userId: string, username: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
            secret: process.env["AT_SECRET"],
            expiresIn: 15 * 60,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
            secret: process.env["RT_SECRET"],
            expiresIn: 7 * 24 * 3600000,
        },
      ),
    ])
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
