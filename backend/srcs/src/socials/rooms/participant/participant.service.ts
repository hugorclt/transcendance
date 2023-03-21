import { Injectable } from '@nestjs/common';
import { Participant, Room } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantService {
  constructor(private prisma: PrismaService) {}

  create(createParticipantDto: CreateParticipantDto) {
    return this.prisma.participant.create({
      data: createParticipantDto,
    });
  }

  findAll() {
    return this.prisma.participant.findMany();
  }

  findOne(id: string) {
    return this.prisma.participant.findUnique({
      where: { id },
    });
  }

  update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return `This action updates a #${id} participant`;
  }

  remove(id: number) {
    return `This action removes a #${id} participant`;
  }

  async createParticipantFromRoom(room: Room & { room: Participant[] }) {
    return Promise.all(
      room.room.map(async (participant) => {
        const user = await this.prisma.user.findUnique({
          where: { id: participant.userId },
        });
        return {
          id: participant.id,
          role: participant.role,
          name: user.username,
          status: user.status,
        };
      }),
    );
  }
}
