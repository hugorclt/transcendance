import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class accessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env['AT_SECRET'],
    })
  }

  async validate(payload: any): Promise<any> {
    if (payload === null) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
