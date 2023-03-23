import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SocialsGateway } from './socials.gateway';

@Module({
  imports: [PrismaModule],
  providers: [SocialsGateway],
  exports: [SocialsGateway],
})
export class SocialsModule {}
