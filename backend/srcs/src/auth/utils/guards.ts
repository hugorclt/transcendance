import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

@Injectable()
export class Auth42Guard extends AuthGuard('42') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return activate;
  }
}

@Injectable()
export class AccessAuthGard extends AuthGuard('access') {}

@Injectable()
export class JwtAccess extends AuthGuard('jwtAccess') {}

@Injectable()
export class RefreshAuthGard extends AuthGuard('refresh') {}
