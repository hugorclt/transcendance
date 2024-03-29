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
import { Queue } from './utils/Queue';
import { ReturnUserEntity } from 'src/users/entities/return-user.entity';
import { HitBox } from 'src/game/resources/utils/HitBox';
import { Vector3 } from 'src/game/resources/utils/Vector3';

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

  dequeue(lobby: LobbyWithMembersEntity) {
    if (lobby.mode === 'CHAMPIONS' && lobby.nbPlayers === 2) {
      this._soloChampionsQ.dequeue();
    } else if (lobby.mode === 'CHAMPIONS' && lobby.nbPlayers === 4) {
      this._duoChampionsQ.dequeue();
    } else if (lobby.mode === 'CLASSIC' && lobby.nbPlayers === 2) {
      this._soloClassicQ.dequeue();
    } else if (lobby.mode === 'CLASSIC' && lobby.nbPlayers === 4) {
      this._duoClassicQ.dequeue();
    }
  }

  matchmaking(lobby: LobbyWithMembersEntity): LobbyWithMembersEntity {
    var queue;
    if (lobby.mode === 'CHAMPIONS' && lobby.nbPlayers === 2) {
      queue = this._soloChampionsQ;
    } else if (lobby.mode === 'CHAMPIONS' && lobby.nbPlayers === 4) {
      queue = this._duoChampionsQ;
    } else if (lobby.mode === 'CLASSIC' && lobby.nbPlayers === 2) {
      queue = this._soloClassicQ;
    } else if (lobby.mode === 'CLASSIC' && lobby.nbPlayers === 4) {
      queue = this._duoClassicQ;
    }
    if (queue.size() === 0) {
      queue.enqueue(lobby);
    } else return queue.dequeue();
  }

  async mergeLobbyRooms(newLobby: LobbyWithMembersEntity, oldLobbyId: string) {
    this.io.adapter.rooms.get(oldLobbyId)?.forEach(async (clientId) => {
      const client = this.io.sockets.get(clientId);
      await client.join(newLobby.id);
      await client.leave(oldLobbyId);
    });
  }

  async afterInit() {
    this._games = new Map<string, Game>();
    this._soloClassicQ = new Queue<LobbyWithMembersEntity>();
    this._duoClassicQ = new Queue<LobbyWithMembersEntity>();
    this._soloChampionsQ = new Queue<LobbyWithMembersEntity>();
    this._duoChampionsQ = new Queue<LobbyWithMembersEntity>();
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

  async spectateGame(user: ReturnUserEntity, lobbyId: string) {
    const game = this._games.get(lobbyId);
    if (!game) return;
    await this.joinUserToLobby(user.id, lobbyId);
  }

  async readyToStart(lobby: LobbyWithMembersEntity) {
    const game = new Game(lobby);
    this._games.set(lobby.id, game);
    this.emitToLobby(lobby.id, 'redirect-to-game', undefined);
    game.start();
  }

  generateFrame(lobbyId: string) {
    const game = this._games.get(lobbyId);
    const frame = game.generateFrame();
    this.io.to(lobbyId).emit('frame', frame);
    return frame;
  }

  @SubscribeMessage('get-game-info')
  async onStartGame(client: AuthSocket) {
    const lobbyId = this.getLobbyIdFromClient(client);
    const game = this._games.get(lobbyId);
    this.io.to(client.userId).emit('game-info', game.exportGameInfo());
  }

  getLobbyIdFromClient(client: AuthSocket): string {
    const lobbyId = Array.from(this.io.adapter.sids.get(client.id)).find(
      (id) => {
        if (id != client.id && id != client.userId) {
          return id;
        }
      },
    );
    return lobbyId;
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

  @SubscribeMessage('super')
  async onSuper(client: AuthSocket) {
    const playerInfo = this.getPlayerInfoFromClient(client);
    playerInfo.player.paddle.goSuper();
  }

  @SubscribeMessage('left-move')
  async onLeftMove(client: AuthSocket) {
    const playerInfo = this.getPlayerInfoFromClient(client);

    const gameObject = playerInfo.game.getObject();
    const playerHitbox = playerInfo.player.paddle.hitBox;
    const confused = playerInfo.player.paddle.confused;
    const isCollided = gameObject.map((object) => {
      if (playerInfo.player.paddle == object) return false;
      if (playerInfo.game.ball == object) return false;
      const newHitbox = new HitBox(
        playerHitbox.width,
        playerHitbox.height,
        playerHitbox.depth,
        new Vector3(
          playerHitbox.getPosition().x + (confused ? 0.2 : -0.2),
          playerHitbox.getPosition().y,
          playerHitbox.getPosition().z,
        ),
      );
      if (object.hitBox.intersect(newHitbox)) {
        return true;
      }
      return false;
    });
    if (isCollided.includes(true)) return;
    playerInfo.player.paddle.moveLeft();
  }

  @SubscribeMessage('right-move')
  async onRightMove(client: AuthSocket) {
    const playerInfo = this.getPlayerInfoFromClient(client);
    const gameObject = playerInfo.game.getObject();
    const playerHitbox = playerInfo.player.paddle.hitBox;
    const confused = playerInfo.player.paddle.confused;
    const isCollided = gameObject.map((object) => {
      if (playerInfo.player.paddle == object) return false;
      if (playerInfo.game.ball == object) return false;
      const newHitbox = new HitBox(
        playerHitbox.width,
        playerHitbox.height,
        playerHitbox.depth,
        new Vector3(
          playerHitbox.getPosition().x + (confused ? -0.2 : 0.2),
          playerHitbox.getPosition().y,
          playerHitbox.getPosition().z,
        ),
      );
      if (object.hitBox.intersect(newHitbox)) {
        return true;
      }
      return false;
    });
    if (isCollided.includes(true)) return;
    playerInfo.player.paddle.moveRight();
  }

  @SubscribeMessage('up-move')
  async onUpMove(client: AuthSocket) {
    const playerInfo = this.getPlayerInfoFromClient(client);
    const gameObject = playerInfo.game.getObject();
    const playerHitbox = playerInfo.player.paddle.hitBox;
    const confused = playerInfo.player.paddle.confused;
    const isCollided = gameObject.map((object) => {
      if (playerInfo.player.paddle == object) return false;
      if (playerInfo.game.ball == object) return false;
      const newHitbox = new HitBox(
        playerHitbox.width,
        playerHitbox.height,
        playerHitbox.depth,
        new Vector3(
          playerHitbox.getPosition().x,
          playerHitbox.getPosition().y + (confused ? -0.2 : 0.2),
          playerHitbox.getPosition().z,
        ),
      );
      if (object.hitBox.intersect(newHitbox)) {
        return true;
      }
      return false;
    });
    if (isCollided.includes(true)) return;
    playerInfo.player.paddle.moveUp();
  }

  @SubscribeMessage('down-move')
  async ondownMove(client: AuthSocket) {
    const playerInfo = this.getPlayerInfoFromClient(client);
    const gameObject = playerInfo.game.getObject();
    const playerHitbox = playerInfo.player.paddle.hitBox;
    const confused = playerInfo.player.paddle.confused;
    const isCollided = gameObject.map((object) => {
      if (playerInfo.player.paddle == object) return false;
      if (playerInfo.game.ball == object) return false;
      const newHitbox = new HitBox(
        playerHitbox.width,
        playerHitbox.height,
        playerHitbox.depth,
        new Vector3(
          playerHitbox.getPosition().x,
          playerHitbox.getPosition().y + (confused ? 0.2 : -0.2),
          playerHitbox.getPosition().z,
        ),
      );
      if (object.hitBox.intersect(newHitbox)) {
        return true;
      }
      return false;
    });
    if (isCollided.includes(true)) return;
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

  async timer(lobbyId: string, eventName: string, seconds: number) {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    const interval = setInterval(() => {
      this.emitToLobby(lobbyId, eventName, seconds--);
    }, 1000);
    await delay(seconds * 1000 + 2000);
    clearInterval(interval);
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

  deleteRoom(lobbyId: string) {
    this.io.in(lobbyId).socketsLeave(lobbyId);
    this._games.delete(lobbyId);
  }

  emitToLobby(lobbyId: string, eventName: string, eventData: any) {
    this.io.to(lobbyId).emit(eventName, eventData);
  }

  emitToLobbySpectators(lobbyId: string, eventName: string, eventData: any) {
    const game = this._games.get(lobbyId);
    if (!game) return;
    const playerIds = game.players.map((player) => player.id);
    const playerSocketIds = playerIds.map(
      (userId) => this.io.adapter.rooms.get(userId).values().next().value,
    );
    const room = this.io.adapter.rooms.get(lobbyId);
    Array.from(room).forEach((id) => {
      if (!playerSocketIds.includes(id)) {
        this.io.to(id).emit(eventName, eventData);
      }
    });
  }
}
