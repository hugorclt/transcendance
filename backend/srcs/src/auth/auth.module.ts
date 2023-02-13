import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleStrategy } from './utils/google-strategy';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule, UsersModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        GoogleStrategy,
    ],
})
export class AuthModule { }