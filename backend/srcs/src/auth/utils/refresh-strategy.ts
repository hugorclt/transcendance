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
    const refreshToken = req?.cookies['jwt'];

    if (!refreshToken) throw new UnauthorizedException();

    if (payload === null) {
      throw new UnauthorizedException();
    }

    const sub = payload.sub;
    return {
      ...payload,
      refreshToken,
    };
  }
}
