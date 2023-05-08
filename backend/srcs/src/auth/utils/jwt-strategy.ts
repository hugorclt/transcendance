import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type jwtPayload = {
  sub: string;
  username: string;
};

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy, 'jwtAccess') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env['AT_SECRET'],
      ignoreExpiration: false,
    });
  }

  async validate(payload: jwtPayload): Promise<any> {
    if (payload === null) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
