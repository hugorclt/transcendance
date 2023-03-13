import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { MessagesModule } from './rooms/messages/messages.module';
import { RoomsModule } from './rooms/rooms.module';
import { SocialsGateway } from './socials.gateway';

@Module({
  imports: [PrismaModule, forwardRef(() => UsersModule), forwardRef(() => RoomsModule), forwardRef(() => MessagesModule)],
  providers: [SocialsGateway],
  exports: [SocialsGateway],
})
export class SocialsModule {}
