import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { Auth42Guard, GoogleAuthGuard, JwtAuthGuard, LocalAuthGuard } from "./utils/guards";
import { AuthService } from "./auth.service";
import { Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LocalRegisterDto } from "./dto/log-user.dto";
import { ReturnUserEntity } from "src/users/entities/return-user.entity";
import { OAuth2Client } from "google-auth-library";
import { ClientRequest } from "http";

const googleClient = new OAuth2Client(
    process.env['GOOGLE_CLIENT_ID'],
    process.env['GOOGLE_CLIENT_SECRET'],
);

@Controller('auth')
@ApiTags('login')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    acceptLoggedUser(@Request() req) {
        return req.userId;
    }

    @Post('google/login')
    async googleLogin(@Body('token') token): Promise<any> {
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env['GOOGLE_CLIENT_ID']
        })
        console.log(ticket.getPayload());
        return {
            success: true,
        }
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