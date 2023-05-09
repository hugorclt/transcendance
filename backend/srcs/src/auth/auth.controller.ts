import {
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  Response,
  UnauthorizedException,
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
import * as EResponse from 'express';

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

  @Get('generate')
  @UseGuards(AccessAuthGard)
  async register(@Req() req) {
    const { otpauthurl } = await this.authService.generate2FaSecret(
      req.user.sub,
    );

    return await this.authService.toUrl(otpauthurl);
  }

  @Post('2fa/turn-on')
  @UseGuards(AccessAuthGard)
  async turnOn2Fa(@Request() req, @Body() body) {
    return await this.authService.turnOn2Fa(req.user.sub, body.code);
  }

  @Get('2fa/turn-off')
  @UseGuards(AccessAuthGard)
  async turnOff2Fa(@Request() req) {
    console.log('yesiam');
    return await this.authService.turnOff2Fa(req.user.sub);
  }

  @Post('2fa/authenticate')
  async authenticate(@Body() body, @Response({ passthrough: true }) res) {
    return await this.authService.loginWith2FA(body.userId,body.username, body.code, res);
  }

  @Post('google/login')
  async googleLogin(
    @Body('token') token,
    @Response({ passthrough: true }) res,
  ): Promise<any> {
    return await this.authService.handleGoogleLogin({ token: token }, res);
  }

  @Post('42/login')
  async handle42Login(
    @Body() body,
    @Response({ passthrough: true }) res,
  ): Promise<any> {
    return await this.authService.handle42Login({ code: body.code, id: body.id}, res);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async handleLocalLogin(
    @Request() req,
    @Response({ passthrough: true }) res,
  ): Promise<any> {
    return await this.authService.login(req.user, res);
  }

  @Post('register')
  async handleLocalRegister(
    @Body() localRegisterDto: LocalRegisterDto,
  ): Promise<ReturnUserEntity> {
    return await this.authService.createNewLocalAccount(localRegisterDto);
  }

  @Get('refresh')
  @UseGuards(RefreshAuthGard)
  async refreshToken(@Request() req, @Response({ passthrough: true }) res) {
    return await this.authService.refreshToken(
      req.user.sub,
      req.user.refreshToken,
      res,
    );
  }

  @Get('logout')
  @UseGuards(AccessAuthGard)
  async logout(@Request() req) {
    await this.authService.logout(req.user.sub);
    return req.user.sub;
  }
}
