import { Injectable } from "@nestjs/common";
import { Status, User } from "@prisma/client";
import { UsersService } from "src/users/users.service";
import { LocalLogDto, LocalRegisterDto } from "./dto/log-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import bcrypt from "bcrypt";
import { exclude } from "../utils/exclude"
import { ReturnUserEntity } from "src/users/entities/return-user.entity";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private prisma: PrismaService) { }

    async createNewAccount(credentials: LocalRegisterDto): Promise<ReturnUserEntity> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(credentials.password, salt);

        return this.usersService.create({
                username: credentials.username,
                email: credentials.email,
                password: hash,
        })
    }

    async validateUser(localLogDto: LocalLogDto): Promise<any> {
        const user = await this.prisma.user.findUnique({
            where: {username: localLogDto.username},
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
}