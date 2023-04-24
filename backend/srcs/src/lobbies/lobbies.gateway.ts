import { UseFilters } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { WsCatchAllFilter } from 'src/exceptions/ws-exceptions/ws-catch-all-filter';
import { AuthSocket } from 'src/socket-adapter/types/AuthSocket.types';
import { PrismaService } from 'src/prisma/prisma.service';
import { Game } from 'src/game/resources/Game/Game';
import { LobbyWithMembersEntity } from './entities/lobby.entity';
import { LobbyEventEntity } from './entities/lobby-event.entity';
import { LobbyState } from '@prisma/client';
import { Queue } from './utils/Queue';
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: 'lobbies',
})
export class LobbiesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly prisma: PrismaService) {}

  @WebSocketServer()
  public io: Namespace;
  private _games: Map<string, Game>;
  private _soloClassicQ: Queue<LobbyWithMembersEntity>;
  private _duoClassicQ: Queue<LobbyWithMembersEntity>;
  private _soloChampionsQ: Queue<LobbyWithMembersEntity>;
  private _duoChampionsQ: Queue<LobbyWithMembersEntity>;

  matchmaking(lobby: LobbyWithMembersEntity): LobbyWithMembersEntity {
    var queue;
    if (lobby.mode === 'CHAMPIONS' && lobby.nbPlayers === 2) {
      //soloQ champions
      queue = this._soloChampionsQ;
    } else if (lobby.mode === 'CHAMPIONS' && lobby.nbPlayers === 4) {
      //duoQ champions
      queue = this._duoChampionsQ;
    } else if (lobby.mode === 'CLASSIC' && lobby.nbPlayers === 2) {
      //soloQ Classic
      queue = this._soloClassicQ;
    } else if (lobby.mode === 'CLASSIC' && lobby.nbPlayers === 4) {
      //duo Q classic
      queue = this._duoClassicQ;
    }
    if (queue.size() === 0) {
      queue.enqueue(lobby);
    } else return queue.dequeue();
  }

  async mergeLobbyRooms(newLobby: LobbyWithMembersEntity, oldLobbyId: string) {
    //get all members of the oldLobbyId and make them join the newLobby
    console.log(
      'merging lobbies: ',
      newLobby.id,
      ' from old lobby: ',
      oldLobbyId,
      '==>',
      this.io.adapter.rooms,
    );
    this.io.adapter.rooms.get(oldLobbyId).forEach(async (clientId) => {
      const client = this.io.sockets.get(clientId);
      await client.join(newLobby.id);
      await client.leave(oldLobbyId);
    });
    console.log('lobbies merged ==>', this.io.adapter.rooms);
  }

  async afterInit() {
    this._games = new Map<string, Game>();
    this._soloClassicQ = new Queue<LobbyWithMembersEntity>();
    this._duoClassicQ = new Queue<LobbyWithMembersEntity>();
    this._soloChampionsQ = new Queue<LobbyWithMembersEntity>();
    this._duoChampionsQ = new Queue<LobbyWithMembersEntity>();

    /* ------------------------------ testing code ------------------------------ */
    console.log('initialization of 1v1 private with hugo / dylan');
    const lobby = await this.prisma.lobby.findFirst({
      where: {
        members: {
          some: {
            user: {
              username: 'Hugo',
            },
          },
        },
      },
      include: {
        members: true,
      },
    });
    if (lobby && lobby.state == 'GAME') {
      this._games.set(lobby.id, new Game(lobby));
      this.emitToLobby(lobby.id, 'redirect-to-game', undefined);
    }
    /* ----------------------------------- ... ---------------------------------- */
  }

  async handleConnection(client: AuthSocket) {
    await client.join(client.userId);
    const lobbyId = await this.getLobby(client);
    if (lobbyId) {
      await client.join(lobbyId);
    }
  }

  handleDisconnect(client: AuthSocket) {
    client.disconnect();
  }

  async readyToStart(lobby: LobbyWithMembersEntity) {
    this._games.set(lobby.id, new Game(lobby));
    this.emitToLobby(lobby.id, 'redirect-to-game', undefined);
  }

  async readySelection(lobby: LobbyWithMembersEntity) {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    var seconds = 15;
    const interval = setInterval(() => {
      this.emitToLobby(lobby.id, 'time-to-choose', seconds--);
    }, 1000);

    await delay(17000);
    // this.emitToLobby(lobby.id, 'on-lobby-update', {
    //   state: LobbyState.GAME,
    // });
    clearInterval(interval);
  }

  @SubscribeMessage('ready-to-play')
  async onReadyToPlay(client: AuthSocket) {
    const playerInfo = this.getPlayerInfoFromClient(client);
    playerInfo.player.ready = true;
    if (playerInfo.game.players.find((player) => !player.ready)) return;
    playerInfo.game.start();
    setInterval(() => {
      const frame = playerInfo.game.generateFrame();
      this.io.to(playerInfo.lobbyId).emit('frame', frame);
      if (frame.collisions?.length > 0) {
        this.io.to(playerInfo.lobbyId).emit('collisions', frame.collisions);
      }
    }, 1000 / 60);
  }

  @SubscribeMessage('get-game-info')
  async onStartGame(client: AuthSocket) {
    const lobbyId = await this.getLobby(client);
    const game = this._games.get(lobbyId);
    this.io.to(client.userId).emit('game-info', game.exportGameInfo());
  }

  getPlayerInfoFromClient(client: AuthSocket): LobbyEventEntity {
    const lobbyId = Array.from(this.io.adapter.sids.get(client.id)).find(
      (id) => {
        if (id != client.id && id != client.userId) {
          return id;
        }
      },
    );
    if (!lobbyId) return;
    const game = this._games.get(lobbyId);
    const player = game.players.find((player) => player.id == client.userId);
    if (!player) return;
    return { lobbyId: lobbyId, game: game, player: player };
  }

  @SubscribeMessage('left-move')
  async onLeftMove(client: AuthSocket) {
    const playerInfo = this.getPlayerInfoFromClient(client);
    playerInfo.player.paddle.moveLeft();
  }

  @SubscribeMessage('right-move')
  async onRightMove(client: AuthSocket) {
    const playerInfo = this.getPlayerInfoFromClient(client);
    playerInfo.player.paddle.moveRight();
  }

  @SubscribeMessage('up-move')
  async onUpMove(client: AuthSocket) {
    const playerInfo = this.getPlayerInfoFromClient(client);
    playerInfo.player.paddle.moveUp();
  }

  @SubscribeMessage('down-move')
  async ondownMove(client: AuthSocket) {
    const playerInfo = this.getPlayerInfoFromClient(client);
    playerInfo.player.paddle.moveDown();
  }

  /* ------------------------------- helper func ------------------------------ */
  async getLobby(client: AuthSocket): Promise<string> {
    const lobby = await this.prisma.lobby.findFirst({
      where: {
        members: {
          some: {
            userId: client.userId,
          },
        },
      },
    });
    return lobby?.id;
  }

  async removeUserFromLobby(lobbyId: string, userId: string) {
    const socketId = (await this.io.adapter.sockets(new Set([userId])))
      .values()
      .next().value;
    if (!socketId) return;
    const socket = this.io.sockets.get(socketId);
    await socket.leave(lobbyId);
  }

  async joinUserToLobby(userId: string, lobbyId: string) {
    const socketId = (await this.io.adapter.sockets(new Set([userId])))
      .values()
      .next().value;
    if (!socketId) return;
    const socket = this.io.sockets.get(socketId);
    await socket.join(lobbyId);
  }

  emitToLobby(lobbyId: string, eventName: string, eventData: any) {
    this.io.to(lobbyId).emit(eventName, eventData);
  }
}
