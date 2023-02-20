import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { Auth42Guard, AccessAuthGard, RefreshAuthGard, LocalAuthGuard } from './utils/guards';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalRegisterDto } from './dto/log-user.dto';
import { ReturnUserEntity } from 'src/users/entities/return-user.entity';

@Controller('auth')
@ApiTags('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(AccessAuthGard)
  acceptLoggedUser(@Request() req) {
    return req.sub;
  }

  @Post('google/login')
  async googleLogin(
    @Body('token') token,
    @Response({ passthrough: true }) res,
  ): Promise<any> {
    return this.authService.handleGoogleLogin({ token: token }, res);
  }

  @Get('42/login')
  @UseGuards(Auth42Guard)
  handle42Login() {
    return { msg: '42 OK' };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  handleLocalLogin(
    @Request() req,
    @Response({ passthrough: true }) res,
  ): Promise<any> {
    return this.authService.login(req.user, res);
  }

  @Post('register')
  handleLocalRegister(
    @Body() localRegisterDto: LocalRegisterDto,
  ): Promise<ReturnUserEntity> {
    return this.authService.createNewLocalAccount(localRegisterDto);
  }

  @Get('refresh')
  @UseGuards(RefreshAuthGard)
  refreshToken(
    @Request() req,
    @Response({ passthrough: true }) res
  ) {
    console.log(req.sub)
    console.log(req.access_token)
    return this.authService.refreshToken(req.sub, req.refresh_token, res);
  }

  @Post('logout')
  @UseGuards(AccessAuthGard)
  logout(
    @Request() req,
  ) {
    this.authService.logout(req.sub);
    return req.sub
  }
}
