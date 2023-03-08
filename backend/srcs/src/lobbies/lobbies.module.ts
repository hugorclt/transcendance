import { Module } from '@nestjs/common';
import { LobbiesService } from './lobbies.service';
import { LobbiesController } from './lobbies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LobbyParticipantsModule } from './lobby-participants/lobby-participants.module';
import { UsersModule } from 'src/users/users.module';
import { LobbiesGateway } from './lobbies.gateway';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    PrismaModule,
    UsersModule,
    LobbyParticipantsModule,
    JwtModule.register({ secret: process.env['AT_SECRET'] }),
  ],
  controllers: [LobbiesController],
  providers: [LobbiesService, LobbiesGateway],
  exports: [LobbiesService, LobbiesGateway],
})
export class LobbiesModule {}
