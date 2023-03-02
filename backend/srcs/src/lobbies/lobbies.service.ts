import { Injectable } from '@nestjs/common';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';
import { JoinLobbyDto } from './dto/join-lobby.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LobbyEntity } from './entities/lobby.entity';

@Injectable()
export class LobbiesService {
  constructor(private readonly prisma: PrismaService) {}

  //may be used in conjunction with security services to find information about user
  async create(createLobbyDto: CreateLobbyDto): Promise<LobbyEntity> {
    return await this.prisma.lobby.create({ data: createLobbyDto });
  }

  async joinLobby(joinLobbyDto: JoinLobbyDto): Promise<LobbyEntity> {
    return await this.prisma.lobby.update({
      where: { id: joinLobbyDto.lobbyId },
      data: {},
    });
  }

  //will be used in matchmaking
  async findAll(): Promise<LobbyEntity[]> {
    return await this.prisma.lobby.findMany({});
  }

  //this will be used when a user is joining a lobby created by a friend
  async findOne(id: string): Promise<LobbyEntity> {
    return await this.prisma.lobby.findUnique({ where: { id } });
  }

  //this will be used when a user is leaving a lobby
  //when we change the rules of the lobby, we need to update the lobby
  async update(
    id: string,
    updateLobbyDto: UpdateLobbyDto,
  ): Promise<LobbyEntity> {
    return await this.prisma.lobby.update({
      where: { id },
      data: updateLobbyDto,
    });
  }

  //we remove a lobby when the game finishes (or starts?)
  //this will be used when the owner leaves the lobby
  async remove(id: string): Promise<LobbyEntity> {
    return await this.prisma.lobby.delete({ where: { id } });
  }
}
