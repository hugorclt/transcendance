import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, PrismaModule, ItemsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'AUTH_SERVICE',
    useClass: AuthService,
  },
    PrismaService],
})
export class AppModule { }
