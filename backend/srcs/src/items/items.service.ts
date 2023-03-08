import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LobbiesGateway } from 'src/lobbies/lobbies.gateway';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService, private socket: LobbiesGateway) {}

  async create(createItemDto: CreateItemDto) {
    return await this.prisma.item.create({ data: createItemDto });
  }

  async findAll() {
    this.socket.emitBroadcast('hello', 'THE BIG TEST');
    return await this.prisma.item.findMany({});
  }

  async findOne(id: string) {
    return await this.prisma.item.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    return await this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.item.delete({
      where: { id },
    });
  }
}
