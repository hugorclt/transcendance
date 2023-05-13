import {
  Injectable,
  MethodNotAllowedException,
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
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import { LobbyState, Type } from '@prisma/client';
import { Api42CodeDto, Api42LogDto } from './dto/api42-log.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map, throwError } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { Api42TokenEntity } from './entities/api42-token.entity';
import { LobbiesService } from 'src/lobbies/lobbies.service';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { createHash } from 'crypto';

const googleClient = new OAuth2Client(
  process.env['GOOGLE_CLIENT_ID'],
  process.env['GOOGLE_CLIENT_SECRET'],
  'postmessage',
);

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly lobbiesService: LobbiesService,
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
    //----- CHECK FOR CODE AUTHENTICITY BY POSTING CODE TO GET ACCESS TOKEN -----
    const tokenEntity = await this.check42Code(api42CodeDto.code);
    if (!tokenEntity) {
      throw new UnauthorizedException('42 code is invalid');
    }
    const userInfo = await this.get42User(tokenEntity);
    if (!userInfo) {
      throw new UnauthorizedException('could not get 42 user info from 42API');
    }
    try {
      const user = await this.usersService.findOne42User(userInfo.email);
      return this.login(user, res);
    } catch (err) {
      const user = await this.usersService.create42({
        email: userInfo.email,
        username: userInfo.username,
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
    const { tokens } = await googleClient.getToken(googleTokenDto.token);
    const ticket = await this.checkGoogleToken(tokens.id_token);
    const payload = ticket.getPayload();
    try {
      const user = await this.usersService.findOneGoogleUser(payload.email);
      return await this.login(user, res);
    } catch (err) {
      const user = await this.usersService.createGoogle({
        email: payload.email,
        username: payload.name,
        password: 'none',
        type: Type.GOOGLE,
      });
      return await this.login(user, res);
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
    const userConnected = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (userConnected.status != 'DISCONNECTED') {
      await this.logout(userConnected.id);
      throw new MethodNotAllowedException(
        'You are already connected somewhere',
      );
    }
    const tokens = await this.getTokens(user.id, user.username);
    const lobby = await this.prisma.lobby.findFirst({
      where: {
        members: {
          some: {
            userId: user.id,
          },
        },
      },
    });
    let status;
    if (lobby) {
      if (lobby.state && lobby.state == 'GAME') status = 'GAME';
      else status = 'LOBBY';
    } else {
      status = 'CONNECTED';
    }
    await this.usersService.updateStatus(user.id, status);

    if (user.is2fa) {
      return { id: user.id, is2fa: true, username: user.username };
    } else {
      res.cookie('jwt', tokens.refresh_token, {
        expires: true,
        maxAge: 7 * 24 * 3600000,
        httpOnly: true,
      });
      await this.updateRefreshHash(user.id, tokens.refresh_token);
      return { access_token: tokens.access_token, is2fa: false };
    }
  }

  async loginWith2FA(
    userId: string,
    username: string,
    code: string,
    @Response({ passthrough: true }) res,
  ) {
    const isCodeValid = await this.isAuth2FaValid(userId, code);
    if (!isCodeValid) throw new UnauthorizedException();
    const userLogged = await this.usersService.findOne(userId);
    const tokens = await this.getTokens(userId, username);
    res.cookie('jwt', tokens.refresh_token, {
      expires: true,
      maxAge: 7 * 24 * 3600000,
      httpOnly: true,
    });
    const lobby = await this.prisma.lobby.findFirst({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
    });
    let status;
    if (lobby) {
      if (lobby.state && lobby.state == 'GAME') status = 'GAME';
      else status = 'LOBBY';
    } else {
      status = 'CONNECTED';
    }
    await this.usersService.updateStatus(userId, status);
    await this.updateRefreshHash(userId, tokens.refresh_token);
    return { access_token: tokens.access_token };
  }

  /* --------------------------------- logout --------------------------------- */
  async logout(userId: string): Promise<void> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
      },
      data: {
        refreshToken: null,
        status: 'DISCONNECTED',
      },
    });
    //should disconnect from lobby
    const lobby = await this.lobbiesService.findLobbyForUser(userId);
    if (
      lobby &&
      lobby.state != LobbyState.GAME &&
      lobby.state != LobbyState.SELECTION
    )
      await this.lobbiesService.leaveLobby({
        userId: userId,
        lobbyId: lobby.id,
      });
    await this.usersService.updateStatus(userId, 'DISCONNECTED');
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
    const hash = createHash('sha256').update(rt).digest('hex');
    const rtMatches = await bcrypt.compare(hash, user.refreshToken);
    console.log(rtMatches);
    if (!rtMatches) throw new UnauthorizedException('Access Denied');

    const newAt = await this.jwtService.signAsync({
      sub: userId,
      username: user.username,
    });
    return { access_token: newAt, username: user.username };
  }

  /* -------------------------------------------------------------------------- */
  /*                               utilyFunctions                               */
  /* -------------------------------------------------------------------------- */
  async getTokens(userId: string, username: string) {
    const [at, rt] = await Promise.all([
      await this.jwtService.signAsync({
        sub: userId,
        username,
      }),
      await this.jwtService.signAsync(
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
    const hash = createHash('sha256').update(rt).digest('hex');
    const newHash = await bcrypt.hash(hash, 10);
    await this.usersService.updateRefreshToken(userId, newHash);
  }

  async checkGoogleToken(token: string): Promise<LoginTicket> {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env['GOOGLE_CLIENT_ID'],
    });
    if (!ticket) throw new UnauthorizedException();
    return ticket;
  }

  /* ----------------------------------- 2fa ---------------------------------- */

  async generate2FaSecret(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const secret = authenticator.generateSecret();
    const otpauthurl = authenticator.keyuri(
      user.email,
      'Pongs Champion',
      secret,
    );
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        secret2fa: secret,
      },
    });
    return {
      secret,
      otpauthurl,
    };
  }

  async toUrl(otpauthurl: string) {
    return await toDataURL(otpauthurl);
  }

  async turnOn2Fa(userId: string, code: string) {
    await this.isAuth2FaValid(userId, code);
    await this.usersService.set2fa(userId, true);
  }

  async turnOff2Fa(userId: string) {
    await this.usersService.set2fa(userId, false);
  }

  async isAuth2FaValid(userId: string, code: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const isValid = authenticator.verify({
      token: code,
      secret: user.secret2fa,
    });

    if (!isValid) throw new UnauthorizedException('Invalid Code');

    return isValid;
  }

  // --------------------  42 UTILS ------------------------
  async get42User(tokenEntity: Api42TokenEntity): Promise<Api42LogDto | null> {
    const headersRequest = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenEntity.access_token}`,
    };
    try {
      const responseData = await lastValueFrom(
        this.httpService
          .get(process.env['API42_ME'], { headers: headersRequest })
          .pipe(
            map((response: AxiosResponse) => {
              return response.data;
            }),
          )
          .pipe(
            catchError((error: AxiosError) => {
              return throwError(() => new Error('test'));
            }),
          ),
      );
      const userInfo: Api42LogDto = {
        username: responseData.login,
        email: responseData.email,
      };
      return userInfo;
    } catch (error) {
      return null;
    }
  }

  async check42Code(code: string): Promise<Api42TokenEntity | null> {
    const headersRequest = {
      'Content-Type': 'application/json',
    };
    try {
      const responseData = await lastValueFrom(
        this.httpService
          .post(
            'https://api.intra.42.fr/oauth/token',
            {
              grant_type: 'authorization_code',
              client_id: process.env['APP_42UID'],
              client_secret: process.env['APP_42SECRET'],
              code: code,
              redirect_uri: process.env['API42_CALLBACK'],
            },
            { headers: headersRequest },
          )
          .pipe(
            map((response: AxiosResponse) => {
              return response.data;
            }),
          )
          .pipe(
            catchError((error: AxiosError) => {
              return throwError(() => new Error('test'));
            }),
          ),
      );
      return responseData;
    } catch (error) {
      return null;
    }
  }
}
