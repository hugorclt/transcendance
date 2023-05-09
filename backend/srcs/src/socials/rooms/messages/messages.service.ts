import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto) {
    return await this.prisma.message.create({
      data: createMessageDto,
    });
  }

  findAll() {
    return this.prisma.message.findMany();
  }

  findOne(id: string) {
    return this.prisma.message.findUnique({
      where: { id },
    });
  }

  async getLastMessage(roomId: string) {
    return await this.prisma.message.findFirst({
      where: {
        roomId: roomId,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async getMessages(roomdId: string): Promise<Message[]> {
    return await this.prisma.message.findMany({
      where: {
        roomId: roomdId,
      },
      orderBy: {
        date: 'asc',
      },
    });
  }
}
