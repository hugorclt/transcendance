import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { SocialsGateway } from './socials.gateway';
import { SocialsService } from './socials.service';

@Module({
  imports: [PrismaModule, UsersModule],
  providers: [SocialsGateway, SocialsService],
  exports: [SocialsGateway, SocialsService],
})
export class SocialsModule {}
