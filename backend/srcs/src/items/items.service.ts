import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LobbiesGateway } from 'src/lobbies/lobbies.gateway';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService, private socket: LobbiesGateway) {}

  async findAll() {
    return await this.prisma.item.findMany({});
  }
}
