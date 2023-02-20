import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-42";

@Injectable()
export class Auth42Strategy extends PassportStrategy( Strategy ) {

    constructor() {
        super({
            clientID: process.env['AUTH42_CLIENT_ID'],
            clientSecret: process.env['AUTH42_CLIENT_SECRET'],
            callbackURL: process.env['AUTH42_CLIENT_CALLBACK'],
            scope: ['profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {

    }
}