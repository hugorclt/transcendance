import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { Auth42Guard, JwtAuthGuard, LocalAuthGuard } from './utils/guards';
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
  @UseGuards(JwtAuthGuard)
  acceptLoggedUser(@Request() req) {
    return req.userId;
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
    return this.authService.login(req, res);
  }

  @Post('register')
  handleLocalRegister(
    @Body() localRegisterDto: LocalRegisterDto,
  ): Promise<ReturnUserEntity> {
    return this.authService.createNewLocalAccount(localRegisterDto);
  }
}
