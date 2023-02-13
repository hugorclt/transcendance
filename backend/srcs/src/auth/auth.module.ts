import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleStrategy } from './utils/google-strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [UsersModule],
    controllers: [AuthController],
    providers: [
        PrismaService,
        AuthService,
        GoogleStrategy,
    ],
})
export class AuthModule { }