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
import { ReturnUserEntity } from 'src/users/entities/return-user.entity';
import { InvitationsService } from 'src/invitations/invitations.service';
import { LobbyMembersService } from './members/lobby-members.service';
import { LobbyMemberEntity } from './members/entities/lobby-member.entity';
import { Team } from '@prisma/client';

@Injectable()
export class LobbiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly invitationsService: InvitationsService,
    private readonly lobbyMembersService: LobbyMembersService,
  ) {}

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
        members: {
          create: {
            team: 'LEFT' as Team,
            ready: false,
            user: {
              connect: { id: ownerId },
            },
          },
        },
      },
    });
    await this.usersService.updateStatus(user.id, 'LOBBY');
    return lobby;
  }
  async findAll(): Promise<LobbyEntity[]> {
    return await this.prisma.lobby.findMany({});
  }

  async findOne(id: string): Promise<LobbyEntity> {
    const lobby = await this.prisma.lobby.findUnique({ where: { id } });
    if (!lobby) throw new NotFoundException('Lobby not found');
    return lobby;
  }

  async findLobbyForUser(userId: string): Promise<LobbyEntity> {
    const lobby = await this.prisma.lobby.findFirst({
      where: {
        members: {
          some: {
            id: userId,
          },
        },
      },
    });
    return lobby;
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
      data: { members: { set: [] } },
    });
    //and update their status?
    //TODO
    console.log('Updating user status...');
    const user = await this.usersService.updateStatus(
      lobby.ownerId,
      'CONNECTED',
    );
    console.log('User successfully left lobby');
    //remove lobby
    console.log('deleting lobby...');
    return await this.prisma.lobby.delete({ where: { id } });
  }

  //====================== JOIN / LEAVE LOBBY ===========================

  async joinLobby(joinLobbyDto: JoinLobbyDto) {
    await this.canUserJoinLobbies(joinLobbyDto.userId);
    console.log('user can join lobby');
    //check if lobby is joinable and / or not full
    //TODO
    const lobby = await this.prisma.lobby.findUnique({
      where: { id: joinLobbyDto.lobbyId },
      include: {
        members: true,
        invitations: true,
      },
    });
    //check if user has been invited to lobby
    await Promise.all(
      lobby.invitations.map(async (invitation) => {
        if (invitation.userId == joinLobbyDto.userId) {
          await this.invitationsService.remove(invitation.id);
        }
      }),
    );
    //join lobby
    const updateLobby = await this.prisma.lobby.update({
      where: {
        id: joinLobbyDto.lobbyId,
      },
      data: {
        members: {
          connect: { id: joinLobbyDto.userId },
        },
      },
    });
    await this.usersService.updateStatus(joinLobbyDto.userId, 'LOBBY');
    console.log('User successfully joined lobby');
    //update lobby status to all participants
    //TODO
    return updateLobby;
  }

  async leaveLobby(joinLobbyDto: JoinLobbyDto) {
    //check if user is lobby owner: delete lobby
    if (
      await this.isUserLobbyOwner(joinLobbyDto.userId, joinLobbyDto.lobbyId)
    ) {
      console.log('player is lobby Owner, deleting lobby...');
      return await this.delete(joinLobbyDto.lobbyId);
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
          members: {
            disconnect: { id: joinLobbyDto.userId },
          },
        },
      });
      console.log('Updating user status...');
      const user = await this.usersService.updateStatus(
        joinLobbyDto.userId,
        'CONNECTED',
      );
      console.log('User successfully left lobby');
      return updateLobby;
    }
  }

  //========================== LOBBY INFOS ===============================
  async findLobbyParticipants(lobbyId: string): Promise<LobbyMemberEntity[]> {
    //find many users who are participants in some lobby with id "lobbyID"
    return await this.lobbyMembersService.findLobbyMembers(lobbyId);
  }

  async findLobbyBanned(lobbyId: string): Promise<ReturnUserEntity[]> {
    //find many users who are banned in some lobby with id "lobbyID"
    const bannedMembers = await this.prisma.user.findMany({
      where: {
        lobbyMember: {
          some: {
            id: lobbyId,
          },
        },
      },
    });
    return bannedMembers;
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
        lobbyMember: {
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
        members: {
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
