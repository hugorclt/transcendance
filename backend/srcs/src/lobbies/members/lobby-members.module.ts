import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LobbyMembersController } from './lobby-members.controller';
import { LobbyMembersService } from './lobby-members.service';

@Module({
  imports: [PrismaModule],
  controllers: [LobbyMembersController],
  providers: [LobbyMembersService],
  exports: [LobbyMembersService],
})
export class LobbyMembersModule {}
