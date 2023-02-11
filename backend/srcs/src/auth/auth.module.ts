import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/google-strategy';

@Module({
    controllers: [AuthController],
    providers: [GoogleStrategy],
})
export class AuthModule {}