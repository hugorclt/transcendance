import { Module } from '@nestjs/common';
import { FriendsActivityGateway } from './friends-activity.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendshipService } from 'src/friendship/friendship.service';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [
    FriendsActivityGateway,
    PrismaService,
    FriendshipService,
    UsersService,
  ],
})
export class WebsocketModule {}
