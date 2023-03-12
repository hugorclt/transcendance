import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { SocialsGateway } from './socials.gateway';

@Module({
  imports: [PrismaModule, forwardRef(() => UsersModule)],
  providers: [SocialsGateway],
  exports: [SocialsGateway],
})
export class SocialsModule {}
