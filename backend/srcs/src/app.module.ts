import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleStrategy } from './google.service';
import { GoogleAuthModule } from './google-auth/google-auth.module';

@Module({
  imports: [GoogleAuthModule],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
