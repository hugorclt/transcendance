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
import { LobbiesService } from './lobbies.service';
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: 'lobbies',
})
export class LobbiesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly lobbiesService: LobbiesService,
  ) {}

  @WebSocketServer()
  io: Namespace;

  afterInit(): void {}

  async handleConnection(client: AuthSocket) {
    client.join(client.userId);
    const lobby = await this.lobbiesService.findLobbyForUser(client.userId);
    if (lobby) {
      console.log('user ', client.username, ' is in lobby ', lobby.id);
      client.join(lobby.id);
    }
  }

  handleDisconnect(client: AuthSocket) {}
}
