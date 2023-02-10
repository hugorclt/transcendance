import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback} from "passport-google-oauth20"
import { Injectable } from "@nestjs/common"

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(){
        super({
            clientID : "414124559304-jaod7l4qg24dl7am8fiu6qmnr4u5rq35.apps.googleusercontent.com",
            clientSecret : "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",
            callbackURL: "http://localhost:3000/auth/google/callback",
            scope: ['email', 'profile']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback)
    : Promise<any>{
        const {name, emails, photos} = profile
        const user= {
            email:emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken
        }
        done(null, user)
    }

}