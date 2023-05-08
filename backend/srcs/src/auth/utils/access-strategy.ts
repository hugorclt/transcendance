import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

type jwtPayload = {
  sub: string;
  username: string;
  isTwoFactorAuthenticated: boolean;
};

@Injectable()
export class accessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    private readonly usersService: UsersService,
  ) {
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
    const user = await this.usersService.findOne(payload.sub);

    if (!user.is2fa) {
      return payload;
    }
    if (payload.isTwoFactorAuthenticated) {
      return payload;
    }
  }
}
