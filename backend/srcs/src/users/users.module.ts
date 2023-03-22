import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SocialsModule } from 'src/socials/socials.module';
import { ParticipantModule } from 'src/socials/rooms/participant/participant.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [PrismaModule, forwardRef(() => SocialsModule)],
})
export class UsersModule {}
