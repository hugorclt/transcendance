import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { RoomsModule } from './rooms/rooms.module';
import { HttpModule } from '@nestjs/axios';
import { GameModule } from './game/game.module';
import { FriendshipController } from './friendship/friendship.controller';
import { FriendshipModule } from './friendship/friendship.module';
import { FriendshipService } from './friendship/friendship.service';
import { GatewayModule } from './gateway/gateway.module';
import { FriendsActivityGateway } from './friends-activity/friends-activity.gateway';
import { ParticipantModule } from './rooms/participant/participant.module';
import { RoomsService } from './rooms/rooms.service';
import { ParticipantService } from './rooms/participant/participant.service';
import { MessagesModule } from './rooms/messages/messages.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ItemsModule,
    UsersModule,
    RoomsModule,
    JwtModule,
    HttpModule,
    GameModule,
    FriendshipModule,
    GatewayModule,
    ParticipantModule,
    MessagesModule,
  ],
  controllers: [AppController, FriendshipController],
  providers: [AppService, AuthService, PrismaService, FriendshipService, FriendsActivityGateway, RoomsService, ParticipantService],
})
export class AppModule {}
