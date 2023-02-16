import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    // constructor(){
    //     super({
    //         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //         ignoreExpirations: false,
    //         secretOrKey: process.env["JWT_SECRET"],
    //     });
    // }

    constructor(){
        super({
            ignoreExpirations: false,
            secretOrKey: process.env["JWT_SECRET"],
            jwtFromRequest:ExtractJwt.fromExtractors([(request:Request) => {
                let data = request?.cookies["jwt"];
                if(!data){
                    return null;
                }
                console.log(data.jwtToken);
                return data.jwtToken
            }])
        });
    }

    // constructor(){
    //     super({
    //         ignoreExpirations: false,
    //         secretOrKey: process.env["JWT_SECRET"],
    //         jwtFromRequest: ExtractJwt.fromExtractors([
    //             JwtStrategy.extractJWT,
    //             ExtractJwt.fromAuthHeaderAsBearerToken(),
    //         ]),
    //     });
    // }

    // private static extractJWT(req: RequestType): string | null {
    //     console.log("extracting token from cookie");
    //     if (
    //         req.cookies &&
    //         'jwt' in req.cookies &&
    //         req.cookies.user_token.length > 0
    //     ) {
    //         console.log(req.cookies.token);
    //         return req.cookies.token;
    //     }
    //     console.log("failed extracting cookie");
    //     return null;
    // }

    async validate(payload: any): Promise<any> {
        if(payload === null){
            throw new UnauthorizedException();
        }
        return payload;
    }
}