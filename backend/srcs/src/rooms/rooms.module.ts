import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ParticipantService } from './participant/participant.service';
import { FriendsActivityService } from 'src/friends-activity/friends-activity.service';
import { FriendshipService } from 'src/friendship/friendship.service';
import { UsersService } from 'src/users/users.service';
import { FriendsActivityModule } from 'src/friends-activity/friend-activity.module';
import { FriendsActivityGateway } from 'src/friends-activity/friends-activity.gateway';

@Module({
  imports: [PrismaModule, FriendsActivityModule],
  controllers: [RoomsController],
  providers: [
    // FriendsActivityGateway,
    RoomsService,
    ParticipantService,
    FriendshipService,
    UsersService,
  ],
})
export class RoomsModule {}
