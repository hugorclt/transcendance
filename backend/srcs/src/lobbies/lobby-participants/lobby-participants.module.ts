import { Module } from '@nestjs/common';
import { LobbyParticipantsService } from './lobby-participants.service';
import { LobbyParticipantsController } from './lobby-participants.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LobbyParticipantsController],
  providers: [LobbyParticipantsService],
  exports: [LobbyParticipantsService],
})
export class LobbyParticipantsModule {}
