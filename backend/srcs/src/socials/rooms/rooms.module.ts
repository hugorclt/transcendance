import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { SocialsModule } from '../socials.module';
import { MessagesModule } from './messages/messages.module';
import { ParticipantModule } from './participant/participant.module';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => ParticipantModule),
    forwardRef(() => SocialsModule),
    forwardRef(() => MessagesModule),
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
