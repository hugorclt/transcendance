import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/prisma/user.service';
import { GoogleStrategy } from './utils/google-strategy';

@Module({
    controllers: [AuthController],
    providers: [
        PrismaService,
        UserService,
        AuthService,
        GoogleStrategy,
    ],
})
export class AuthModule { }