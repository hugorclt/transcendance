import { Controller, Get, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./utils/guards";

@Controller('auth')
export class AuthController {
    
    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleGoogleLogin() {
        return {msg :'Google auth'}
    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    handleRedirect() {
        return {msg: 'OK'};
    }

    @Get('42/login')
    handle42Login() {
        return {msg: "42 OK"};
    }
}