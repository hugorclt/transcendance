import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./utils/guards";
import { AuthService } from "./auth.service";
import { Credentials } from "src/interfaces/credentials.interface";
import { Body } from "@nestjs/common";
import { User } from ".prisma/client";

@Controller('auth')
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
        return { msg: 'OK' };
    }

    @Get('42/login')
    handle42Login() {
        return { msg: "42 OK" };
    }

    @Post('/login')
    handleLogin(@Body() credentials: Credentials): Promise<User> {
        return this.authService.createNewAccount(credentials);
    }
}