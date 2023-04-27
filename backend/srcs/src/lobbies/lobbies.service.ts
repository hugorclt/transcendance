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
import { EMap, EPaddle, LobbyState } from '@prisma/client';
import { maps } from 'src/game/resources/utils/config/maps';
import { SocialsGateway } from 'src/socials/socials.gateway';
import { MatchesService } from 'src/matches/matches.service';
import { StatsService } from 'src/stats/stats.service';

@Injectable()
export class LobbiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly invitationsService: InvitationsService,
    private readonly lobbyMembersService: LobbyMembersService,
    private readonly lobbiesGateway: LobbiesGateway,
    private readonly socialGateway: SocialsGateway,
    private readonly matchesService: MatchesService,
    private readonly statsService: StatsService,
  ) {}

  async create(
    ownerId: string,
    createLobbyDto: CreateLobbyDto,
  ): Promise<LobbyWithMembersEntity> {
    const user = await this.canUserJoinLobbies(ownerId);
    var state;
    if (createLobbyDto.nbPlayers == 2) state = LobbyState.FULL;
    else state = LobbyState.JOINABLE;
    const lobby = await this.prisma.lobby.create({
      data: {
        ownerId: ownerId,
        nbPlayers: createLobbyDto.nbPlayers,
        maxDuration: createLobbyDto.maxDuration,
        mode: createLobbyDto.mode,
        map: createLobbyDto.map,
        state: state,
        members: {
          create: {
            team: false,
            ready: true,
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
                avatar: true,
              },
            },
          },
        },
      },
    });
    return lobby;
  }

  //A PROTEGER
  async update(
    id: string,
    updateLobbyDto: UpdateLobbyDto,
  ): Promise<LobbyEntity> {
    return await this.prisma.lobby.update({
      where: { id },
      data: updateLobbyDto,
    });
  }

  //A PROTEGER
  async delete(id: string): Promise<LobbyEntity> {
    console.log('getting users from lobby: ', id);
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
    console.log('updating lobby by deleting members');
    const lobby = await this.prisma.lobby.update({
      where: { id },
      data: { members: { deleteMany: {} } },
    });
    console.log('deleting lobby where id: ', id);
    return await this.prisma.lobby.delete({ where: { id } });
  }

  //====================== JOIN / LEAVE LOBBY ===========================

  async joinLobby(userId: string, joinLobbyDto: JoinLobbyDto) {
    if (userId != joinLobbyDto.userId) return; //A COMPLETER ?
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
          this.socialGateway.emitToUser(
            invitation.userId,
            'delete-notifs',
            invitation.id,
          );
        }
      }),
    );
    if (lobby.state != LobbyState.JOINABLE) {
      throw new MethodNotAllowedException(
        'Lobby is not joinable / already full',
      );
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
    await this.updateLobbyState(updateLobby.id, null);
    return await this.findLobbyWithMembers(updateLobby.id);
  }

  /* ---------------- Update Lobby State (Backend Originated) ---------------- */
  async updateLobbyState(
    lobbyId: string,
    state: LobbyState,
  ): Promise<LobbyWithMembersEntity> {
    const lobby = await this.findLobbyWithMembers(lobbyId);
    var updatedLobby;
    if (!state) {
      if (
        (!lobby.private && lobby.members.length == lobby.nbPlayers / 2) ||
        (lobby.private && lobby.members.length == lobby.nbPlayers)
      ) {
        if (lobby.state == LobbyState.JOINABLE) {
          updatedLobby = await this.prisma.lobby.update({
            where: { id: lobby.id },
            data: { state: LobbyState.FULL },
            include: { members: true },
          });
          this.lobbiesGateway.emitToLobby(lobby.id, 'on-lobby-update', {
            state: updatedLobby.state,
          });
          return updatedLobby;
        }
      } else if (lobby.state == LobbyState.FULL) {
        updatedLobby = await this.prisma.lobby.update({
          where: { id: lobby.id },
          data: { state: LobbyState.JOINABLE },
          include: { members: true },
        });
        this.lobbiesGateway.emitToLobby(lobby.id, 'on-lobby-update', {
          state: updatedLobby.state,
        });
        return updatedLobby;
      }
    } else {
      updatedLobby = await this.prisma.lobby.update({
        where: { id: lobby.id },
        data: { state: state as LobbyState },
        include: { members: true },
      });
      this.lobbiesGateway.emitToLobby(lobby.id, 'on-lobby-update', {
        state: updatedLobby.state,
      });
      return updatedLobby;
    }
    return lobby;
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
    await this.lobbiesGateway.removeUserFromLobby(lobbyId, userId);
    return await this.updateLobbyState(lobbyId, null);
  }

  async leaveLobby(joinLobbyDto: JoinLobbyDto): Promise<LobbyEntity> {
    if (
      await this.isUserLobbyOwner(joinLobbyDto.userId, joinLobbyDto.lobbyId)
    ) {
      return await this.delete(joinLobbyDto.lobbyId);
    }
    if (await this.isUserInLobby(joinLobbyDto.userId, joinLobbyDto.lobbyId)) {
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
    });
    await this.updateLobbyState(lobbyId, null);
    updateLobby = await this.findLobbyWithMembers(lobbyId);
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
    if (!lobby) throw new NotFoundException('Lobby not found');
    return lobby;
  }

  async mergeLobbies(
    lobby1: LobbyWithMembersEntity,
    lobby2: LobbyWithMembersEntity,
  ): Promise<LobbyWithMembersEntity> {
    const updatedMembers = await this.prisma.lobbyMember.updateMany({
      where: {
        id: {
          in: lobby2.members.map((member) => member.id),
        },
      },
      data: {
        lobbyId: lobby1.id,
        team: true,
      },
    });
    const deleteLobby = await this.delete(lobby2.id);
    const mergedLobby = await this.findLobbyWithMembers(lobby1.id);
    this.lobbiesGateway.emitToLobby(lobby2.id, 'on-lobby-update', mergedLobby);
    return mergedLobby;
  }

  async changeReady(lobbyId: string, userId: string) {
    const lobby = await this.findLobbyWithMembers(lobbyId);
    let member = lobby.members.find((member) => member.userId == userId);
    let lobbyUpdated = await this.prisma.lobby.update({
      where: {
        id: lobby.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: member.id,
            },
            data: {
              ready: !member.ready,
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
    member = lobbyUpdated.members.find((member) => member.userId == userId);
    this.lobbiesGateway.emitToLobby(lobbyId, 'on-member-update', member);
  }

  async startGame(lobbyId: string, userId: string) {
    var lobby = await this.prisma.lobby.findFirst({
      where: {
        ownerId: userId,
      },
      include: {
        members: true,
      },
    });
    if (!lobby) throw new NotFoundException('No such lobby or not lobby owner');
    if (lobby.state != LobbyState.FULL)
      throw new MethodNotAllowedException('Cannot start game, missing players');
    const notReady = lobby.members.find((member) => member.ready == false);
    if (notReady)
      throw new MethodNotAllowedException(
        'Cannot start game, players are not ready',
      );
    /* ------------------------------- matchmaking ------------------------------ */
    if (lobby.private === false) {
      const lobbyMatch = this.lobbiesGateway.matchmaking(lobby);
      if (!lobbyMatch) {
        var lobbyWithMembers = await this.updateLobbyState(
          lobby.id,
          LobbyState.MATCHMAKING,
        );
        return;
      } else {
        const newLobby = await this.mergeLobbies(lobby, lobbyMatch);
        await this.lobbiesGateway.mergeLobbyRooms(newLobby, lobbyMatch.id);
      }
    }
    if (lobby.mode === 'CHAMPIONS') {
      var lobbyWithMembers = await this.updateLobbyState(
        lobby.id,
        LobbyState.SELECTION,
      );
      await this.lobbiesGateway.timer(lobby.id, 'time-to-choose', 15);
    }
    var lobbyWithMembers = await this.updateLobbyState(
      lobby.id,
      LobbyState.GAME,
    );
    await this.lobbiesGateway.readyToStart(lobbyWithMembers);
    /* ------------------------------ interval loop ----------------------------- */
    const interval = setInterval(async () => {
      const frame = this.lobbiesGateway.generateFrame(lobby.id);
      if (frame.score.team1 >= 2 || frame.score.team2 >= 2) {
        clearInterval(interval);
        this.lobbiesGateway.emitToLobby(lobby.id, 'end-game', undefined);
        var winners;
        var losers;
        var winnerScore;
        var loserScore;
        if (frame.score.team1 > frame.score.team2) {
          winners = lobbyWithMembers.members.flatMap((member) => {
            if (member.team == false) return member.userId;
          });
          losers = lobbyWithMembers.members.flatMap((member) => {
            if (member.team == true) return member.userId;
          });
          winnerScore = frame.score.team1;
          loserScore = frame.score.team2;
        } else {
          winners = lobbyWithMembers.members.flatMap((member) => {
            if (member.team == true) return member.userId;
          });
          losers = lobbyWithMembers.members.flatMap((member) => {
            if (member.team == false) return member.userId;
          });
          winnerScore = frame.score.team2;
          loserScore = frame.score.team1;
        }
        winners = winners.filter((winner) => winner !== undefined);
        losers = losers.filter((loser) => loser !== undefined);
        const match = await this.matchesService.create({
          date: new Date(),
          duration: new Date(),
          winnerScore: winnerScore,
          winners: winners,
          loserScore: loserScore,
          losers: losers,
        });
        const winnersStats = await this.prisma.stat.updateMany({
          where: {
            userId: {
              in: winners,
            },
          },
          data: {
            nbGame: {
              increment: 1,
            },
            nbWin: {
              increment: 1,
            },
          },
        });
        const loserStats = await this.prisma.stat.updateMany({
          where: {
            userId: {
              in: losers,
            },
          },
          data: {
            nbGame: {
              increment: 1,
            },
          },
        });
        await this.delete(lobby.id);
        return;
      }
    }, 1000 / 60);
  }

  async paddleSelected(userId: string, lobbyId: string, paddleName: string) {
    var paddleType;
    switch (paddleName) {
      case 'Base Paddle':
        paddleType = EPaddle.BASIC;
        break;

      case 'Red Paddle':
        paddleType = EPaddle.RED;
        break;

      case 'Blue Paddle':
        paddleType = EPaddle.BLUE;
        break;

      case 'Orange Paddle':
        paddleType = EPaddle.ORANGE;
        break;

      case 'Purple Paddle':
        paddleType = EPaddle.PURPLE;
        break;

      case 'Green Paddle':
        paddleType = EPaddle.GREEN;
        break;

      default:
        paddleType = EPaddle.BASIC;
    }

    return await this.prisma.lobby.update({
      where: {
        id: lobbyId,
      },
      data: {
        members: {
          updateMany: {
            where: {
              userId: userId,
            },
            data: {
              paddleType: paddleType,
            },
          },
        },
      },
    });
  }

  async getMap() {
    return maps.map((map) => {
      return { name: map.name, img: map.miniature };
    });
  }

  async voteMap(userId: string, lobbyId: string, mapName: string) {
    const selectedMap = maps.find((map) => mapName == map.name);
    if (!selectedMap) throw new NotFoundException();

    const votes = await this.prisma.lobby.update({
      include: {
        members: true,
      },
      where: {
        id: lobbyId,
      },
      data: {
        members: {
          updateMany: {
            where: {
              userId: userId,
            },
            data: {
              vote: selectedMap.mapRef,
            },
          },
        },
      },
    });
    const vote = votes.members.map((member) => member.vote);
    await this.lobbiesGateway.emitToLobby(lobbyId, 'on-vote', vote);
    return vote;
  }

  async getVotes(lobbyId: string) {
    const lobby = await this.prisma.lobby.findFirst({
      where: {
        id: lobbyId,
      },
      include: {
        members: true,
      },
    });
    return lobby.members.map((member) => member.vote);
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
