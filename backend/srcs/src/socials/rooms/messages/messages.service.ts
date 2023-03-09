import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor (private prisma: PrismaService) {}

  create(createMessageDto: CreateMessageDto) {
    return this.prisma.message.create({
      data: createMessageDto
    })
  }

  findAll() {
    return this.prisma.message.findMany();
  }

  findOne(id: string) {
    return this.prisma.message.findUnique({
      where: {id}
    });
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
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
}
