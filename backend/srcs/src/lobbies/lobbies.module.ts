import { Module } from '@nestjs/common';
import { LobbiesService } from './lobbies.service';
import { LobbiesController } from './lobbies.controller';

@Module({
  controllers: [LobbiesController],
  providers: [LobbiesService],
})
export class LobbiesModule {}
