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
          console.log('/auth/me: jwtToken = ', data.jwtToken);
          return data.jwtToken;
        },

      ]),
    });
  }

  async validate(req: Request, payload: any): Promise<any> {
    const cookie = req?.cookies['jwt'];

    if (!cookie) // BIZARRE DE FOU PREMIER TRUC A CHECK SI BUG
      throw new UnauthorizedException();
    const refreshToken = cookie.jwtToken;

    if (payload === null) {
      throw new UnauthorizedException();
    }

    return {
      ...payload,
      refreshToken,
    };
  }
}
