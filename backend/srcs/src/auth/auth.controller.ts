import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { Auth42Guard, GoogleAuthGuard, JwtAuthGuard, LocalAuthGuard } from "./utils/guards";
import { AuthService } from "./auth.service";
import { Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LocalRegisterDto } from "./dto/log-user.dto";
import { ReturnUserEntity } from "src/users/entities/return-user.entity";

@Controller('auth')
@ApiTags('login')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    acceptLoggedUser(@Request() req) {
        return req.userId;
    }

    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleGoogleLogin() {
        return { msg: 'Google auth' };
    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    handleRedirect() {
        return { msg: 'Google callback OK' };
    }

    @Get('42/login')
    @UseGuards(Auth42Guard)
    handle42Login() {
        return { msg: "42 OK" };
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    handleLocalLogin(@Request() req): Promise<any> {
        return this.authService.login(req);
    }

    @Post('register')
    handleLocalRegister(@Body() localRegisterDto: LocalRegisterDto): Promise<ReturnUserEntity> {
        return this.authService.createNewAccount(localRegisterDto);
    }
}