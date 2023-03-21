import { forwardRef, Module } from '@nestjs/common';
import { LobbiesService } from './lobbies.service';
import { LobbiesController } from './lobbies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { LobbiesGateway } from './lobbies.gateway';
import { SocialsModule } from 'src/socials/socials.module';
import { InvitationsModule } from 'src/invitations/invitations.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => SocialsModule),
    forwardRef(() => InvitationsModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [LobbiesController],
  providers: [LobbiesService, LobbiesGateway],
  exports: [LobbiesService, LobbiesGateway],
})
export class LobbiesModule {}
