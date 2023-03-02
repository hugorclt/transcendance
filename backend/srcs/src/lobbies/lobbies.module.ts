import { Module } from '@nestjs/common';
import { LobbiesService } from './lobbies.service';
import { LobbiesController } from './lobbies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LobbyParticipantsModule } from './lobby-participants/lobby-participants.module';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [PrismaModule, UsersModule, LobbyParticipantsModule],
  controllers: [LobbiesController],
  providers: [LobbiesService],
  exports: [LobbiesService],
})
export class LobbiesModule {}
