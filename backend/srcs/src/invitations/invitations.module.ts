import { forwardRef, Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LobbiesModule } from 'src/lobbies/lobbies.module';
import { SocialsModule } from 'src/socials/socials.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => SocialsModule),
    forwardRef(() => LobbiesModule),
    UsersModule,
  ],
  controllers: [InvitationsController],
  providers: [InvitationsService],
  exports: [InvitationsService],
})
export class InvitationsModule {}
