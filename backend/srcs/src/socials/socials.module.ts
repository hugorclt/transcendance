import { forwardRef, Global, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { SocialsGateway } from './socials.gateway';

@Module({
  imports: [PrismaModule, forwardRef(() => UsersModule)],
  providers: [SocialsGateway],
  exports: [SocialsGateway],
})
export class SocialsModule {}
