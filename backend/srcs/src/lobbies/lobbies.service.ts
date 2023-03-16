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

  //=========================== CRUD OPERATIONS ======================
  async create(
    ownerId: string,
    createLobbyDto: CreateLobbyDto,
  ): Promise<LobbyEntity> {
    const user = await this.canUserJoinLobbies(ownerId);
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
    await this.usersService.updateStatus(user.id, 'LOBBY');
    await this.socialsGateway.sendStatusUpdate(user.id);
    return lobby;
  }
  async findAll(): Promise<LobbyEntity[]> {
    return await this.prisma.lobby.findMany({});
  }

  async findOne(id: string): Promise<LobbyEntity> {
    return await this.prisma.lobby.findUnique({ where: { id } });
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

  async delete(id: string): Promise<LobbyEntity> {
    //remove all lobby participants
    console.log('Disconnecting all lobby players...');
    const lobby = await this.prisma.lobby.update({
      where: { id },
      data: { players: { set: [] } },
    });
    //and update their status?
    //TODO
    console.log('Updating user status...');
    const user = await this.usersService.updateStatus(
      lobby.ownerId,
      'CONNECTED',
    );
    console.log('sending status update via socket...');
    await this.socialsGateway.sendStatusUpdate(user.id);
    console.log('User successfully left lobby');
    //remove lobby
    console.log('deleting lobby...');
    return await this.prisma.lobby.delete({ where: { id } });
  }

  //====================== JOIN / LEAVE LOBBY ===========================

  async joinLobby(joinLobbyDto: JoinLobbyDto) {
    //check if user can join a lobby
    await this.canUserJoinLobbies(joinLobbyDto.userId);
    console.log('user can join lobby');
    //check if lobby is joinable and / or not full
    const lobby = await this.prisma.lobby.findUnique({
      where: { id: joinLobbyDto.lobbyId },
      include: {
        players: true,
      },
    });
    if (lobby.nbPlayers < lobby.players.length) {
      //lobby not full
      console.log('lobby can be joined');
    }
    //join lobby
    const updateLobby = await this.prisma.lobby.update({
      where: {
        id: joinLobbyDto.lobbyId,
      },
      data: {
        players: {
          connect: { id: joinLobbyDto.userId },
        },
      },
    });
    console.log('User successfully joined lobby');
    return updateLobby;
    //update lobby status to all participants
  }

  async leaveLobby(joinLobbyDto: JoinLobbyDto) {
    console.log('leave lobby from lobbiesService');
    //check if user is lobby owner: delete lobby
    const check = await this.isUserLobbyOwner(
      joinLobbyDto.userId,
      joinLobbyDto.lobbyId,
    );
    if (check) {
      console.log('player is lobby Owner, deleting lobby...');
      await this.delete(joinLobbyDto.lobbyId);
    }
    //check if user is lobby participant:
    const check2 = await this.isUserInLobby(
      joinLobbyDto.userId,
      joinLobbyDto.lobbyId,
    );
    if (check2) {
      console.log('User is lobby participant, disconnecting user...');
      //disconnect user from lobby
      const updateLobby = await this.prisma.lobby.update({
        where: {
          id: joinLobbyDto.lobbyId,
        },
        data: {
          players: {
            disconnect: { id: joinLobbyDto.userId },
          },
        },
      });
      console.log('Updating user status...');
      const user = await this.usersService.updateStatus(
        joinLobbyDto.userId,
        'CONNECTED',
      );
      console.log('sending status update via socket...');
      await this.socialsGateway.sendStatusUpdate(user.id);
      console.log('User successfully left lobby');
      return updateLobby;
    }
  }

  //========================== LOBBY INFOS ===============================
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

  //============================ HELPER FUNCTIONS =============================
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
    //check if user is banned from lobby ?
    return user;
  }
}
