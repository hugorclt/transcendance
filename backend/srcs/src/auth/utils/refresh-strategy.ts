import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class refreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      ignoreExpirations: false,
      passReqToCallback: true,
      secretOrKey: process.env['RT_SECRET'],
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let data = request?.cookies['jwt'];
          if (!data) {
            return null;
          }
          return data;
        },
      ]),
    });
  }

  async validate(req: Request, payload: any): Promise<any> {
    console.log('refresh guard');
    const refreshToken = req?.cookies['jwt'];

    console.log('refresh token: ', refreshToken);
    if (!refreshToken)
      // BIZARRE DE FOU PREMIER TRUC A CHECK SI BUG
      throw new UnauthorizedException();

    if (payload === null) {
      throw new UnauthorizedException();
    }

    const sub = payload.sub;
    console.log(payload.sub);
    return {
      sub,
      refreshToken,
    };
  }
}
