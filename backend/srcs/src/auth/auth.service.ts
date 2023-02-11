import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService{
    
    validateUser(details: User) {
        console.log('AuthService');
        console.log(details);
    }
}