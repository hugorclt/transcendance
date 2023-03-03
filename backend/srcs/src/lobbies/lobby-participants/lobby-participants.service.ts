import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLobbyParticipantDto } from './dto/create-lobby-participant.dto';
import { UpdateLobbyParticipantDto } from './dto/update-lobby-participant.dto';
import { LobbyParticipantEntity } from './entities/lobby-participant.entity';

@Injectable()
export class LobbyParticipantsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createLobbyParticipantDto: CreateLobbyParticipantDto,
  ): Promise<LobbyParticipantEntity> {
    return await this.prisma.lobbyParticipant.create({
      data: createLobbyParticipantDto,
    });
  }

  async findAll(): Promise<LobbyParticipantEntity[]> {
    return await this.prisma.lobbyParticipant.findMany();
  }

  async findByLobby(id: string): Promise<LobbyParticipantEntity[]> {
    return await this.prisma.lobbyParticipant.findMany({
      where: {
        lobbyId: id,
      },
    });
  }

  async findOne(id: string): Promise<LobbyParticipantEntity> {
    return await this.prisma.lobbyParticipant.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    updateLobbyParticipantDto: UpdateLobbyParticipantDto,
  ): Promise<LobbyParticipantEntity> {
    return await this.prisma.lobbyParticipant.update({
      where: { id },
      data: updateLobbyParticipantDto,
    });
  }

  async remove(id: string): Promise<LobbyParticipantEntity> {
    return await this.prisma.lobbyParticipant.delete({ where: { id } });
  }
}
