import { Injectable } from "@nestjs/common";
import { Status } from "@prisma/client";
import { Credentials } from "src/interfaces/credentials.interface";
import { UserService } from "src/prisma/user.service";

@Injectable()
export class AuthService {
    constructor(private prisma: UserService) { }

    async createNewAccount(credentials: Credentials): Promise<User> {
        return this.prisma.createUser({
                username: credentials.username,
                email: credentials.email,
                password: credentials.password,
                avatar: '#',
                status: Status.CONNECTED,
                balance: 0,
        })
    }

    validateUser(details: User) {
        console.log('AuthService');
        console.log(details);
    }
}