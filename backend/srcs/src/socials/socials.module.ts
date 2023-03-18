import { forwardRef, Module } from '@nestjs/common';
import { InvitationsModule } from 'src/invitations/invitations.module';
import { LobbiesModule } from 'src/lobbies/lobbies.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { MessagesModule } from './rooms/messages/messages.module';
import { RoomsModule } from './rooms/rooms.module';
import { SocialsGateway } from './socials.gateway';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => UsersModule),
    forwardRef(() => RoomsModule),
    forwardRef(() => MessagesModule),
    forwardRef(() => InvitationsModule),
    forwardRef(() => LobbiesModule),
  ],
  providers: [SocialsGateway],
  exports: [SocialsGateway],
})
export class SocialsModule {}
