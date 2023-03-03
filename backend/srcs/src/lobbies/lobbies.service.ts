import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';
import { JoinLobbyDto } from './dto/join-lobby.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LobbyEntity } from './entities/lobby.entity';
import { UsersService } from 'src/users/users.service';
import { LobbyParticipantEntity } from './lobby-participants/entities/lobby-participant.entity';
import { LobbyParticipantsService } from './lobby-participants/lobby-participants.service';

@Injectable()
export class LobbiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly lobbyParticipantsService: LobbyParticipantsService,
  ) {}

  // A User can only have one Lobby, it can only be part of one Lobby
  async canUserCreateLobbies(userId: string): Promise<boolean> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new MethodNotAllowedException(
        'You are not allowed to create lobbies',
      );
    }
    const check = await this.prisma.lobby.findFirst({
      where: { ownerId: user.id },
    });
    const check2 = await this.prisma.lobbyParticipant.findFirst({
      where: { userId: user.id },
    });
    if (check || check2) {
      throw new MethodNotAllowedException(
        'You are not allowed to create lobbies',
      );
    }
    return true;
  }

  async create(createLobbyDto: CreateLobbyDto): Promise<LobbyEntity> {
    const canCreate = await this.canUserCreateLobbies(createLobbyDto.ownerId);
    if (!canCreate) {
      return null;
    }
    const lobby = await this.prisma.lobby.create({
      data: createLobbyDto,
    });
    return lobby;
  }

  async isUserLobbyOwner(userId: string): Promise<boolean> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const check = await this.prisma.lobby.findFirst({
      where: { ownerId: user.id },
    });
    if (!check) {
      return false;
    }
    return true;
  }

  async joinLobby(joinLobbyDto: JoinLobbyDto): Promise<LobbyEntity> {
    //check is user can join lobby
    const isOwner = await this.isUserLobbyOwner(joinLobbyDto.userId);
    if (isOwner) {
      throw new MethodNotAllowedException(
        'You are not allowed to join a lobby (you are a lobby owner)',
      );
    }
    const check = await this.prisma.lobbyParticipant.findFirst({
      where: { userId: joinLobbyDto.userId },
    });
    if (check) {
      //if user is already in a lobby, make him quit said lobby and join the new one
      throw new MethodNotAllowedException(
        'You are not allowed to join a lobby (already in a lobby)',
      );
    }
    return await this.prisma.lobby.update({
      where: { id: joinLobbyDto.lobbyId },
      data: {},
    });
  }

  async findAll(): Promise<LobbyEntity[]> {
    return await this.prisma.lobby.findMany({});
  }

  async findOne(id: string): Promise<LobbyEntity> {
    return await this.prisma.lobby.findUnique({ where: { id } });
  }

  async findLobbyParticipants(
    lobbyId: string,
  ): Promise<LobbyParticipantEntity[]> {
    //find lobby with lobbyId
    const check = await this.prisma.lobby.findFirst({
      where: { id: lobbyId },
    });
    if (!check) {
      throw new NotFoundException('Lobby not found');
    }
    //return all lobby participants
    return await this.lobbyParticipantsService.findByLobby(lobbyId);
  }

  async update(
    id: string,
    updateLobbyDto: UpdateLobbyDto,
  ): Promise<LobbyEntity> {
    return await this.prisma.lobby.update({
      where: { id },
      data: updateLobbyDto,
    });
  }

  async remove(id: string): Promise<LobbyEntity> {
    return await this.prisma.lobby.delete({ where: { id } });
  }
}
