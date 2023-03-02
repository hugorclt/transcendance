import { Module } from '@nestjs/common';
import { LobbyParticipantsService } from './lobby-participants.service';
import { LobbyParticipantsController } from './lobby-participants.controller';

@Module({
  controllers: [LobbyParticipantsController],
  providers: [LobbyParticipantsService],
  exports: [LobbyParticipantsService],
})
export class LobbyParticipantsModule {}
