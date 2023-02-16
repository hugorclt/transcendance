import { Injectable, Response, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { LocalLogDto, LocalRegisterDto } from "./dto/log-user.dto";
import { GoogleTokenDto, GoogleLogDto } from "./dto/google-log.dto";
import { PrismaService } from "src/prisma/prisma.service";
import bcrypt from "bcrypt";
import { exclude } from "../utils/exclude"
import { ReturnUserEntity } from "src/users/entities/return-user.entity";
import { JwtService } from '@nestjs/jwt'
import { LoginTicket, OAuth2Client } from "google-auth-library";
import { Type } from "@prisma/client";

const googleClient = new OAuth2Client(
    process.env['GOOGLE_CLIENT_ID'],
    process.env['GOOGLE_CLIENT_SECRET'],
);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, 
                private prisma: PrismaService,
                private jwtService: JwtService ) { }


    //====================  LOCAL ===============================
    async createNewLocalAccount(credentials: LocalRegisterDto): Promise<ReturnUserEntity> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(credentials.password, salt);

        return this.usersService.create({
                username: credentials.username,
                email: credentials.email,
                password: hash,
        })
    }

    async validateUser(localLogDto: LocalLogDto): Promise<ReturnUserEntity> {
        const user = await this.prisma.user.findFirst({
            where: {username: localLogDto.username, type: Type.LOCAL},
        })

        if (user){
            // bcrypt.compare(localLogDto.password, user.password, function(err, result){
            //     if (result)
            //         return exclude(user, ['password'])
            //     else
            //         //failure
            // });     
            return exclude(user, ['password'])
        }
        //else
        return null;
    }

    async login(user: any, @Response({passthrough: true}) res ) {
        const payload = {username: user.username, sub: user.id};
        const jwtToken = await this.jwtService.signAsync(payload)

        let secretData = {
            jwtToken,
            refreshToken: ''
        }

        res.cookie('jwt', secretData, {httpOnly:true})
        return payload;
    }

    //====================== GOOGLE ===================
    async checkGoogleToken(token: string): Promise<LoginTicket>{
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env['GOOGLE_CLIENT_ID']
        })
        if (!ticket)
            throw new UnauthorizedException();
        return (ticket);
    }

    async handleGoogleLogin(googleTokenDto: GoogleTokenDto, @Response({passthrough: true}) res): Promise<any> {
        //----- CHECK AUTHENTICITY OF GOOGLE TOKENID -----
        const ticket = await this.checkGoogleToken(googleTokenDto.token);

        const payload = ticket.getPayload();
        try{
            const user = await this.usersService.findOneGoogleUser(payload.email)
            return this.login(user, res);
        }
        catch(err){
            const user = await this.usersService.createGoogle({
                email: payload.email,
                username: payload.name,
                password: "none",
                type: Type.GOOGLE,
            })
            return this.login(user, res);
        }
    }
}