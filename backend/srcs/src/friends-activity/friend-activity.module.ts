import { Module, Global } from '@nestjs/common';
import { FriendsActivityGateway } from './friends-activity.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendshipService } from 'src/friendship/friendship.service';
import { UsersService } from 'src/users/users.service';
import { FriendsActivityService } from './friends-activity.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { ParticipantService } from 'src/rooms/participant/participant.service';

@Global()
@Module({
  providers: [
    // FriendsActivityGateway,
    PrismaService,
    FriendshipService,
    UsersService,
    FriendsActivityService,
    RoomsService,
    ParticipantService,
  ],
  exports: [FriendsActivityService],
})
export class FriendsActivityModule {}
