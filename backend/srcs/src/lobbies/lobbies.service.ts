import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';
import { JoinLobbyDto } from './dto/join-lobby.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LobbyEntity, LobbyWithMembersEntity } from './entities/lobby.entity';
import { UsersService } from 'src/users/users.service';
import { ReturnUserEntity } from 'src/users/entities/return-user.entity';
import { InvitationsService } from 'src/invitations/invitations.service';
import { LobbyMembersService } from './members/lobby-members.service';
import { LobbyMemberEntity } from './members/entities/lobby-member.entity';
import { LobbiesGateway } from './lobbies.gateway';

@Injectable()
export class LobbiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly invitationsService: InvitationsService,
    private readonly lobbyMembersService: LobbyMembersService,
    private readonly lobbiesGateway: LobbiesGateway,
  ) {}

  async create(
    ownerId: string,
    createLobbyDto: CreateLobbyDto,
  ): Promise<LobbyWithMembersEntity> {
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
            team: false,
            ready: false,
            user: {
              connect: { id: ownerId },
            },
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });
    console.log('created lobby: ', lobby);
    await this.usersService.updateStatus(user.id, 'LOBBY');
    await this.lobbiesGateway.joinUserToLobby(user.id, lobby.id);
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

  async findLobbyForUser(userId: string): Promise<LobbyWithMembersEntity> {
    const lobby = await this.prisma.lobby.findFirst({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
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
    //check if user  is lobbyOwner
    const users = await this.prisma.user.findMany({
      where: {
        lobbyMember: {
          some: {
            lobbyId: id,
          },
        },
      },
    });
    await Promise.all(
      users.map(async (user) => {
        await this.usersService.updateStatus(user.id, 'CONNECTED');
      }),
    );
    const lobby = await this.prisma.lobby.update({
      where: { id },
      data: { members: { deleteMany: {} } },
    });
    console.log('deleting lobby...');
    return await this.prisma.lobby.delete({ where: { id } });
  }

  //====================== JOIN / LEAVE LOBBY ===========================

  async joinLobby(userId: string, joinLobbyDto: JoinLobbyDto) {
    //is user the one sending the request
    if (userId != joinLobbyDto.userId) return;
    const user = await this.canUserJoinLobbies(joinLobbyDto.userId);
    const lobby = await this.prisma.lobby.findUnique({
      where: { id: joinLobbyDto.lobbyId },
      include: {
        members: true,
        invitations: true,
      },
    });
    if (!lobby) throw new NotFoundException('Lobby not found');
    await Promise.all(
      lobby.invitations.map(async (invitation) => {
        if (invitation.userId == joinLobbyDto.userId) {
          await this.invitationsService.remove(invitation.id);
        }
      }),
    );
    if (
      (!lobby.private && lobby.members.length == lobby.nbPlayers / 2) ||
      (lobby.private && lobby.members.length == lobby.nbPlayers)
    ) {
      console.log('lobby full');
      throw new MethodNotAllowedException('Lobby is already full');
    }
    //join lobby
    //TODO : check if team is full => join the right team accordingly
    var team;
    //if left team is full
    if (
      lobby.members.filter((el) => el.team == false).length <
      lobby.nbPlayers / 2
    ) {
      team = false;
    } else team = true;

    const updateLobby = await this.prisma.lobby.update({
      where: {
        id: joinLobbyDto.lobbyId,
      },
      data: {
        members: {
          create: {
            team: team,
            ready: false,
            userId: joinLobbyDto.userId,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });
    await this.usersService.updateStatus(joinLobbyDto.userId, 'LOBBY');
    await this.lobbiesGateway.joinUserToLobby(joinLobbyDto.userId, lobby.id);
    const member = updateLobby.members.find(
      (member) => member.userId === joinLobbyDto.userId,
    );
    this.lobbiesGateway.emitToLobby(lobby.id, 'user-joined-lobby', {
      memberId: member.id,
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      team: team,
      ready: false,
    });
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
      //disconnect user from lobby by deleting lobbyMember
      //todo save old member id to send back
      const updateLobby = await this.prisma.lobby.update({
        where: {
          id: joinLobbyDto.lobbyId,
        },
        data: {
          members: {
            deleteMany: {
              userId: joinLobbyDto.userId,
            },
          },
        },
      });
      console.log('Updating user status...');
      const user = await this.usersService.updateStatus(
        joinLobbyDto.userId,
        'CONNECTED',
      );
      console.log('User successfully left lobby');
      //update lobby members of departure
      this.lobbiesGateway.emitToLobby(updateLobby.id, 'user-left-lobby', {
        userId: joinLobbyDto.userId,
      });
      return updateLobby;
    }
  }

  async changeTeam(
    lobbyId: string,
    userId: string,
  ): Promise<LobbyMemberEntity> {
    const lobby = await this.findLobbyWithMembers(lobbyId);
    if (lobby.private == false) {
      console.log('Lobby is not private, cannot change team');
      throw new MethodNotAllowedException(
        'Cannot change team, lobby is not private',
      );
    }
    //extract concerned member
    const member = lobby.members.find((member) => member.userId == userId);
    //check if member is already ready
    if (member.ready)
      throw new MethodNotAllowedException('Cannot change team, you are ready');
    //check if other team full
    const opponentTeamSize = lobby.members.filter(
      (el) => el.team != member.team,
    ).length;
    if (opponentTeamSize < lobby.nbPlayers / 2) {
      //update team for concerned member
      const updateMember = await this.lobbyMembersService.update(member.id, {
        team: !member.team,
      });
      //send update via socket to lobby
      this.lobbiesGateway.emitToLobby(
        lobbyId,
        'on-member-update',
        updateMember,
      );
      return updateMember;
    }
  }

  async changePrivacy(lobbyId: string, userId: string): Promise<LobbyEntity> {
    const check = await this.isUserLobbyOwner(userId, lobbyId);
    if (!check) throw new MethodNotAllowedException('You are not lobby owner');
    const lobby = await this.findOne(lobbyId);
    const updateLobby = await this.update(lobbyId, { private: !lobby.private });
    this.lobbiesGateway.emitToLobby(lobby.id, 'lobby-privacy-update', {
      private: updateLobby.private,
    });
    return updateLobby;
  }

  async findLobbyWithMembers(lobbyId: string) {
    const lobby = await this.prisma.lobby.findUnique({
      where: {
        id: lobbyId,
      },
      include: {
        members: true,
      },
    });
    if (!lobby) throw new NotFoundException('Lobby not found');
    return lobby;
  }

  async changeReady(
    lobbyId: string,
    userId: string,
  ): Promise<LobbyMemberEntity> {
    const lobby = await this.findLobbyWithMembers(lobbyId);
    //extract concerned member
    const member = lobby.members.find((member) => member.userId == userId);
    const updateMember = await this.lobbyMembersService.update(member.id, {
      ready: !member.ready,
    });
    //send update via socket to lobby
    this.lobbiesGateway.emitToLobby(lobbyId, 'on-member-update', updateMember);
    return updateMember;
  }

  //========================== LOBBY INFOS ===============================
  async findLobbyParticipants(lobbyId: string): Promise<LobbyMemberEntity[]> {
    return await this.lobbyMembersService.findLobbyMembers(lobbyId);
  }

  async findLobbyBanned(lobbyId: string): Promise<ReturnUserEntity[]> {
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
            lobbyId: lobbyId,
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
    //user exists?
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    //user is not already in a lobby
    const lobby = await this.prisma.lobby.findFirst({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
    });
    if (lobby) {
      throw new MethodNotAllowedException('User can only be in one lobby');
    }
    return user;
  }
}
