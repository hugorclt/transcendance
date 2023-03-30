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
                avatar: true,
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
    var team;
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
                avatar: true,
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

  async makePlayerLeaveLobby(lobbyId: string, userId: string) {
    const updateLobby = await this.prisma.lobby.update({
      where: {
        id: lobbyId,
      },
      data: {
        members: {
          deleteMany: {
            userId: userId,
          },
        },
      },
    });
    const user = await this.usersService.updateStatus(userId, 'CONNECTED');
    this.lobbiesGateway.emitToLobby(updateLobby.id, 'user-left-lobby', {
      userId: userId,
    });
    return updateLobby;
  }

  async leaveLobby(joinLobbyDto: JoinLobbyDto) {
    if (
      await this.isUserLobbyOwner(joinLobbyDto.userId, joinLobbyDto.lobbyId)
    ) {
      return await this.delete(joinLobbyDto.lobbyId);
    }
    const check2 = await this.isUserInLobby(
      joinLobbyDto.userId,
      joinLobbyDto.lobbyId,
    );
    if (check2) {
      const updateLobby = this.makePlayerLeaveLobby(
        joinLobbyDto.lobbyId,
        joinLobbyDto.userId,
      );
      return updateLobby;
    }
  }

  async changeTeam(
    lobbyId: string,
    userId: string,
  ): Promise<LobbyMemberEntity> {
    const lobby = await this.findLobbyWithMembers(lobbyId);
    if (lobby.private == false) {
      throw new MethodNotAllowedException(
        'Cannot change team, lobby is not private',
      );
    }
    const member = lobby.members.find((member) => member.userId == userId);
    if (member.ready)
      throw new MethodNotAllowedException('Cannot change team, you are ready');
    const opponentTeamSize = lobby.members.filter(
      (el) => el.team != member.team,
    ).length;
    if (opponentTeamSize < lobby.nbPlayers / 2) {
      const updateMember = await this.lobbyMembersService.update(member.id, {
        team: !member.team,
      });
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
    const lobby = await this.findLobbyWithMembers(lobbyId);
    const ownerTeam = lobby.members.find(
      (user) => user.userId == lobby.ownerId,
    ).team;
    var updateLobby;
    var ownerTeamMembers = lobby.members.filter((el) => el.team == ownerTeam);
    var opponentTeamMembers = lobby.members.filter(
      (el) => el.team != ownerTeam,
    );
    if (ownerTeamMembers.length < lobby.nbPlayers / 2) {
      while (
        opponentTeamMembers.length > 0 &&
        ownerTeamMembers.length < lobby.nbPlayers / 2
      ) {
        const member = opponentTeamMembers.at(0);
        const updateMember = await this.lobbyMembersService.update(member.id, {
          team: !member.team,
          ready: false,
        });
        updateLobby = await this.findLobbyWithMembers(lobby.id);
        opponentTeamMembers = updateLobby.members.filter(
          (el) => el.team != ownerTeam,
        );
        ownerTeamMembers = updateLobby.members.filter(
          (el) => el.team == ownerTeam,
        );
      }
    }
    await Promise.all(
      opponentTeamMembers.flatMap(async (player) => {
        await this.makePlayerLeaveLobby(lobby.id, player.userId);
      }),
    );
    if (ownerTeam) {
      await Promise.all(
        ownerTeamMembers.map(async (member) => {
          await this.lobbyMembersService.update(member.id, {
            team: !member.team,
            ready: false,
          });
        }),
      );
    }
    updateLobby = await this.prisma.lobby.update({
      where: {
        id: lobbyId,
      },
      data: {
        private: !lobby.private,
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                username: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
    this.lobbiesGateway.emitToLobby(lobby.id, 'on-lobby-update', updateLobby);
    return updateLobby;
  }

  async kickPlayer(lobbyId: string, senderId: string, playerId: string) {
    const lobby = await this.findLobbyWithMembers(lobbyId);
    if (lobby.ownerId != senderId || playerId == senderId)
      throw new MethodNotAllowedException(
        'You are not allowed to kick players',
      );
    const member = lobby.members.find((player) => player.userId == playerId);
    if (!member)
      throw new MethodNotAllowedException(
        'Cannot kick player who is not in lobby',
      );
    const updateLobby = await this.makePlayerLeaveLobby(lobby.id, playerId);
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
    const member = lobby.members.find((member) => member.userId == userId);
    const updateMember = await this.lobbyMembersService.update(member.id, {
      ready: !member.ready,
    });
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
