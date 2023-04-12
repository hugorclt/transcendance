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
import { BaseFieldConfig } from 'src/game/resources/utils/config/config';
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: 'lobbies',
})
export class LobbiesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly prisma: PrismaService) {}

  @WebSocketServer()
  io: Namespace;
  private _games: Map<string, Game>;

  async afterInit() {
    this._games = new Map<string, Game>();
    // console.log('initialization of 1v1 private with hugo / dylan');
    // const lobby = await this.prisma.lobby.findFirst({
    //   where: {
    //     members: {
    //       some: {
    //         user: {
    //           username: 'Hugo',
    //         },
    //       },
    //     },
    //   },
    //   include: {
    //     members: true,
    //   },
    // });
    // if (lobby && lobby.state == 'GAME') {
    //   this._games.set(lobby.id, new Game(lobby));
    //   this.emitToLobby(lobby.id, 'redirect-to-game', undefined);
    // }
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

  @SubscribeMessage('get-game-info')
  async onStartGame(client: AuthSocket) {
    const lobbyId = await this.getLobby(client);
    const game = this._games.get(lobbyId);
    this.io.to(client.userId).emit('game-info', {
      walls: game.field.walls,
      players: game.players,
      ball: game.ball,
    });
  }

  @SubscribeMessage('mouse-move')
  async mouseMove(client: AuthSocket, { x, y }) {
    const lobbyId = Array.from(this.io.adapter.sids.get(client.id)).find(
      (id) => {
        if (id != client.id && id != client.userId) {
          return id;
        }
      },
    );
    const game = this._games.get(lobbyId);
    const player = game.players.find((player) => player.id == client.userId);
    if (!player) return;

    player.paddle.move(
      x * BaseFieldConfig.HorizontalWallConfig.width,
      y * BaseFieldConfig.VerticalWallConfig.height,
    );
    this.io.to(lobbyId).emit('on-move', {
      x: player.paddle.getPosition().x,
      y: player.paddle.getPosition().y,
    });
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

  async joinUserToLobby(userId: string, lobbyId: string) {
    const socketId = (await this.io.adapter.sockets(new Set([userId])))
      .values()
      .next().value;
    if (!socketId) return;
    console.log('joining user with id: ', userId, ' to lobby: ', lobbyId);
    const socket = this.io.sockets.get(socketId);
    await socket.join(lobbyId);
  }

  emitToLobby(lobbyId: string, eventName: string, eventData: any) {
    console.log('emitting to lobby: ', lobbyId);
    this.io.to(lobbyId).emit(eventName, eventData);
  }
}
