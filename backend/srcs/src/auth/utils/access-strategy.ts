import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

type jwtPayload = {
  sub: string;
  username: string;
};

@Injectable()
export class accessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(private readonly prisma: PrismaService) {
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
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    if (!user || user.status == 'DISCONNECTED') {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
