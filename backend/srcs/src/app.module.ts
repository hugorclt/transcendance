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
import { SocketModule } from './socket/socket-module';
import { FriendshipController } from './friendship/friendship.controller';
import { FriendshipModule } from './friendship/friendship.module';
import { FriendshipService } from './friendship/friendship.service';
import { FriendsActivityGateway } from './friends-activity/friends-activity.gateway';
import { GameGateway } from './game/game.gateway';
import { GameModule } from './game/game.module';
import { LobbyModule } from './lobby/lobbies.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ItemsModule,
    UsersModule,
    RoomsModule,
    JwtModule,
    HttpModule,
    SocketModule,
    FriendshipModule,
    FriendshipModule,
    GameModule,
    LobbyModule,
  ],
  controllers: [AppController, FriendshipController],
  providers: [
    AppService,
    AuthService,
    PrismaService,
    FriendshipService,
    FriendsActivityGateway,
    GameGateway,
  ],
})
export class AppModule {}
