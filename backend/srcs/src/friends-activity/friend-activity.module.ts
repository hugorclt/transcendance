import { Module, Global } from '@nestjs/common';
import { FriendsActivityGateway } from './friends-activity.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendshipService } from 'src/friendship/friendship.service';
import { UsersService } from 'src/users/users.service';
import { FriendsActivityService } from './friends-activity.service';

@Global()
@Module({
  providers: [
    FriendsActivityGateway,
    PrismaService,
    FriendshipService,
    UsersService,
    FriendsActivityService,
  ],
})
export class WebsocketModule {}
