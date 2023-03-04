import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ParticipantService } from './participant/participant.service';
import { FriendsActivityService } from 'src/friends-activity/friends-activity.service';
import { FriendshipService } from 'src/friendship/friendship.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PrismaModule],
  controllers: [RoomsController],
  providers: [RoomsService, ParticipantService, FriendsActivityService, FriendshipService, UsersService]
})
export class RoomsModule {}
