import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleStrategy } from './utils/google-strategy';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/local-strategy';

@Module({
    imports: [UsersModule, PassportModule],
    controllers: [AuthController],
    providers: [
        PrismaService,
        AuthService,
        GoogleStrategy,
        LocalStrategy,
    ],
})
export class AuthModule { }