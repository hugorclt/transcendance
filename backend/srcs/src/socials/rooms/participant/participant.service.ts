import { Injectable } from '@nestjs/common';
import { Participant, Room } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.participant.findMany();
  }

  findOne(id: string) {
    return this.prisma.participant.findUnique({
      where: { id },
    });
  }

  async createParticipantFromRoom(
    room: Room & { participants: Participant[] },
  ) {
    return await Promise.all(
      room.participants.map(async (participant) => {
        const user = await this.prisma.user.findUnique({
          where: { id: participant.userId },
        });
        return {
          id: user.id,
          role: participant.role,
          name: user.username,
          status: user.status,
          mute: participant.mute,
          avatar: user.avatar,
        };
      }),
    );
  }
}
