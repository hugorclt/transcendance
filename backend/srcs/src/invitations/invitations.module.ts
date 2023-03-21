import { forwardRef, Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LobbiesModule } from 'src/lobbies/lobbies.module';
import { SocialsModule } from 'src/socials/socials.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => SocialsModule),
    forwardRef(() => LobbiesModule),
  ],
  controllers: [InvitationsController],
  providers: [InvitationsService],
  exports: [InvitationsService],
})
export class InvitationsModule {}
