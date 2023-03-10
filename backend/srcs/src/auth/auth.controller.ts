import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import {
  AccessAuthGard,
  RefreshAuthGard,
  LocalAuthGuard,
} from './utils/guards';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalRegisterDto } from './dto/log-user.dto';
import { ReturnUserEntity } from 'src/users/entities/return-user.entity';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
@ApiTags('login')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get('me')
  @UseGuards(AccessAuthGard)
  async me(@Request() req) {
    return await this.usersService.findOne(req.user.sub);
  }

  @Post('google/login')
  async googleLogin(
    @Body('token') token,
    @Response({ passthrough: true }) res,
  ): Promise<any> {
    return this.authService.handleGoogleLogin({ token: token }, res);
  }

  @Post('42/login')
  async handle42Login(
    @Body('code') code,
    @Response({ passthrough: true }) res,
  ): Promise<any> {
    return this.authService.handle42Login({ code: code }, res);
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
  refreshToken(@Request() req, @Response({ passthrough: true }) res) {
    return this.authService.refreshToken(
      req.user.sub,
      req.user.refreshToken,
      res,
    );
  }

  @Get('logout')
  @UseGuards(AccessAuthGard)
  logout(@Request() req) {
    this.authService.logout(req.user.sub);
    return req.user.sub;
  }
}
