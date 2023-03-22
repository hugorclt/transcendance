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
import { SocialsGateway } from 'src/socials/socials.gateway';

@Controller('auth')
@ApiTags('login')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly socialsGateway: SocialsGateway,
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
    return await this.authService.handleGoogleLogin({ token: token }, res);
  }

  @Post('42/login')
  async handle42Login(
    @Body('code') code,
    @Response({ passthrough: true }) res,
  ): Promise<any> {
    return await this.authService.handle42Login({ code: code }, res);
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
    this.socialsGateway.sendStatusUpdate(req.user.sub);
    return req.user.sub;
  }
}
