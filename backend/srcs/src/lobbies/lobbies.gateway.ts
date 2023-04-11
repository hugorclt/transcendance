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
import { LobbyMemberEntity } from './members/entities/lobby-member.entity';
import { LobbyWithMembersEntity } from './entities/lobby.entity';
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

  afterInit(): void {}

  async handleConnection(client: AuthSocket) {
    await client.join(client.userId);
    const lobby = await this.prisma.lobby.findFirst({
      where: {
        members: {
          some: {
            userId: client.userId,
          },
        },
      },
    });
    if (lobby) {
      console.log('user ', client.username, ' is in lobby ', lobby.id);
      await client.join(lobby.id);
    }
  }

  handleDisconnect(client: AuthSocket) {
    client.disconnect();
  }

  async readyToStart(lobby: LobbyWithMembersEntity) {
    //wait 3 seconds before start
    this._games.set(lobby.id, new Game(lobby));
    this.emitToLobby(lobby.id, 'redirect-to-game', undefined);
  }

  @SubscribeMessage('start-game')
  async onStartGame(userId: string, lobbyId: string) {
    const game = this._games.get(lobbyId);
    //wait 3 second until all player has loaded the game screen in front
    this.io.emit('game-info', {
      field: game.field,
      players: game.players,
      ball: game.ball,
    });
  }

  /* ------------------------------- helper func ------------------------------ */
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
