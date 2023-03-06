import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RoomsModule } from '../rooms.module';

@Module({
  imports: [RoomsModule, PrismaModule],
  controllers: [ParticipantController],
  providers: [ParticipantService]
})
export class ParticipantModule {}
