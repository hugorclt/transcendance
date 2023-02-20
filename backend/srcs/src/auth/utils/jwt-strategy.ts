import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      ignoreExpirations: false,
      secretOrKey: process.env['JWT_SECRET'],
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

  async validate(payload: any): Promise<any> {
    if (payload === null) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
