import { Injectable } from "@nestjs/common";
import { Status, User } from "@prisma/client";
import { Credentials } from "src/interfaces/credentials.interface";
import { UsersService } from "src/users/users.service";
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async createNewAccount(credentials: Credentials): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(credentials.password, salt);

        return this.usersService.create({
                username: credentials.username,
                email: credentials.email,
                password: hash,
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