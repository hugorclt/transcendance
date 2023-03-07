import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { SocialsService } from '../socials.service';
import { MessagesService } from './messages/messages.service';
import { ParticipantService } from './participant/participant.service';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [RoomsController],
<<<<<<< HEAD
  providers: [
    RoomsService,
    ParticipantService,
    SocialsService,
    MessagesService,
  ],
=======
  providers: [RoomsService, ParticipantService, SocialsService],
>>>>>>> main
  exports: [RoomsService],
})
export class RoomsModule {}
