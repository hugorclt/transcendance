import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { Auth42Guard, GoogleAuthGuard, LocalAuthGuard } from "./utils/guards";
import { AuthService } from "./auth.service";
import { Credentials } from "src/interfaces/credentials.interface";
import { Body } from "@nestjs/common";
import { User } from ".prisma/client";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { LocalLogDto } from "./dto/log-user.dto";

@Controller('auth')
@ApiTags('login')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleGoogleLogin() {
        return { msg: 'Google auth' }
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
    handleLocalLogin(@Request() req, @Body() localLogDto: LocalLogDto): any {
        console.log(localLogDto);
        return req.user;
    }

    // @Post('/login')
    // handleLogin(@Body() credentials: Credentials): Promise<User> {
    //     return this.authService.createNewAccount(credentials);
    // }
}