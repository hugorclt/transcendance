import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LobbiesModule } from 'src/lobbies/lobbies.module';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
  imports: [PrismaModule, LobbiesModule],
})
export class ItemsModule {}
