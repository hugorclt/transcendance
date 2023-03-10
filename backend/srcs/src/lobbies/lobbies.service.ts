import {
  INestApplication,
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
import { LobbiesGateway } from './lobbies.gateway';
import { ReturnUserEntity } from 'src/users/entities/return-user.entity';
import { SocialsGateway } from 'src/socials/socials.gateway';

@Injectable()
export class LobbiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly lobbiesGateway: LobbiesGateway,
    private readonly socialsGateway: SocialsGateway,
  ) {}

  // A User can only have one Lobby, it can only be part of one Lobby
  async canUserJoinLobbies(userId: string): Promise<ReturnUserEntity> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const lobby = await this.prisma.lobby.findFirst({
      where: {
        players: {
          some: {
            id: userId,
          },
        },
      },
    });
    if (lobby) {
      throw new MethodNotAllowedException('User can only be in one lobby');
    }
    return user;
  }

  async create(
    ownerId: string,
    createLobbyDto: CreateLobbyDto,
  ): Promise<LobbyEntity> {
    const user = await this.canUserJoinLobbies(ownerId);
    console.log('user can create lobby');
    const lobby = await this.prisma.lobby.create({
      data: {
        ownerId: ownerId,
        nbPlayers: createLobbyDto.nbPlayers,
        maxDuration: createLobbyDto.maxDuration,
        mode: createLobbyDto.mode,
        map: createLobbyDto.map,
        players: {
          connect: { id: ownerId },
        },
      },
    });
    //need to connect owner to lobby as participant
    console.log('lobby created ', lobby);
    await this.usersService.updateStatus(user.id, 'LOBBY');
    console.log('lobby owner status updated in db');
    this.socialsGateway.sendStatusUpdate({
      username: user.username,
      userId: user.id,
      avatar: user.avatar,
      status: 'LOBBY',
    });
    console.log('lobby owner status updated in socials');
    return lobby;
  }

  async isUserLobbyOwner(userId: string, lobbyId: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
        lobbyOwner: {
          some: {
            id: lobbyId,
          },
        },
      },
    });
    if (!user) {
      return false;
    }
    return true;
  }

  async isUserInLobby(userId: string, lobbyId: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
        lobbyParticipant: {
          some: {
            id: lobbyId,
          },
        },
      },
    });
    if (!user) {
      return false;
    }
    return true;
  }

  async joinLobby(joinLobbyDto: JoinLobbyDto) {
    //check if user can join a lobby
    const user = await this.canUserJoinLobbies(joinLobbyDto.userId);
    //check if lobby is joinable and / or not full
    //TODO
    //join lobby
    //TODO
  }

  async findAll(): Promise<LobbyEntity[]> {
    return await this.prisma.lobby.findMany({});
  }

  async findOne(id: string): Promise<LobbyEntity> {
    return await this.prisma.lobby.findUnique({ where: { id } });
  }

  async findLobbyParticipants(lobbyId: string): Promise<ReturnUserEntity[]> {
    //find many users who are participants in some lobby with id "lobbyID"
    const participants = await this.prisma.user.findMany({
      where: {
        lobbyParticipant: {
          some: {
            id: lobbyId,
          },
        },
      },
    });
    return participants;
  }

  async findLobbyBanned(lobbyId: string): Promise<ReturnUserEntity[]> {
    //find many users who are banned in some lobby with id "lobbyID"
    const participants = await this.prisma.user.findMany({
      where: {
        lobbyParticipant: {
          some: {
            id: lobbyId,
          },
        },
      },
    });
    return participants;
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
    //find lobby with lobbyId
    //remove all lobby participants and update their status?
    //remove lobby
    const lobby = await this.prisma.lobby.findUnique({ where: { id } });
    // const participants = await this.lobbyParticipantsService.findByLobby;
    return await this.prisma.lobby.delete({ where: { id } });
  }
}
