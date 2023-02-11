import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './prisma/user.service';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'AUTH_SERVICE',
    useClass: AuthService,
  },
  PrismaService, UserService],
})
export class AppModule {}
