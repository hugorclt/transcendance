import { UseFilters } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { WsCatchAllFilter } from 'src/exceptions/ws-exceptions/ws-catch-all-filter';
import { AuthSocket } from 'src/socket-adapter/types/AuthSocket.types';
import { PrismaService } from 'src/prisma/prisma.service';
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

  afterInit(): void {}

  async handleConnection(client: AuthSocket) {
    client.join(client.userId);
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
      client.join(lobby.id);
    }
  }

  handleDisconnect(client: AuthSocket) {}

  emitToLobby(lobbyId: string, eventName: string, eventData: any) {
    this.io.to(lobbyId).emit(eventName, eventData);
  }
}
