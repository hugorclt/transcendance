import { Injectable } from "@nestjs/common";
import { Status, User } from "@prisma/client";
import { UsersService } from "src/users/users.service";
import { LocalRegisterDto } from "./dto/log-user.dto";
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async createNewAccount(credentials: LocalRegisterDto): Promise<User> {
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

    //This portion of the code is only in charge of validating or not the credentials given to login
    //the usersService is in charge of finding the user matching the credentials if it exists
    //The local-strategy will be in charge of handling the answer of the authService and provide needed exception in case of failure
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);

        //if user found matching email and password
        if (user && user.password === password){
            const { password, username, ...rest} = user //we remove password and email , retrieve the rest
            return rest;
        }
        //else
        return null;
    }
}