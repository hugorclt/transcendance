import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/local-strategy';
import { JwtModule } from '@nestjs/jwt';
import { refreshStrategy } from './utils/refresh-strategy';
import { accessStrategy } from './utils/access-strategy';
import { HttpModule } from '@nestjs/axios';
import { FriendshipService } from 'src/friendship/friendship.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { ParticipantService } from 'src/rooms/participant/participant.service';
import {FriendsActivityService} from 'src/friends-activity/friends-activity.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    HttpModule,
    JwtModule.register({
      secret: process.env['AT_SECRET'],
      signOptions: {
        expiresIn: '20s',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    LocalStrategy,
    refreshStrategy,
    accessStrategy,
    FriendshipService,
    RoomsService,
    ParticipantService,
    FriendsActivityService,
  ],
})
export class AuthModule {}
