import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { LocalLogDto } from "../dto/log-user.dto";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpirations: false,
            secretOrKey: jwtConstants.secret,
        }); // config for the strategy, not much needed here for local strategy 
    }

    //An equivalent can be to use a VerifyCallback that will do this for us (depending on the strategy we use)
    async validate(payload: any): Promise<any> {
        return { userId: payload.sub, username: payload.username };
    }
}