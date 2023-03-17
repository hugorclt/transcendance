import { Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LobbiesModule } from 'src/lobbies/lobbies.module';

@Module({
  imports: [PrismaModule, LobbiesModule],
  controllers: [InvitationsController],
  providers: [InvitationsService],
})
export class InvitationsModule {}
