import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { ParticipantService } from './rooms/participant/participant.service';
import { RoomsService } from './rooms/rooms.service';
import { SocialsGateway } from './socials.gateway';
import { SocialsService } from './socials.service';

@Module({
  imports: [PrismaModule, UsersModule],
  providers: [SocialsService, SocialsGateway],
  controllers: [],
  exports: [SocialsService],
})
export class SocialsModule {}
