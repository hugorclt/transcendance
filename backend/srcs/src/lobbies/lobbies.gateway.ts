import { UseFilters } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { WsCatchAllFilter } from 'src/exceptions/ws-exceptions/ws-catch-all-filter';
import { AuthSocket } from 'src/socket-adapter/types/AuthSocket.types';
import { LobbiesService } from './lobbies.service';

@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: 'lobbies',
})
export class LobbiesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly lobbiesService: LobbiesService) {}

  @WebSocketServer()
  io: Namespace;

  afterInit(): void {}

  async handleConnection(client: AuthSocket): Promise<void> {
    client.join(client.userId);
    const lobby = await this.lobbiesService
      .findLobbyByClientId(client.userId)
      .catch((error) => {
        throw error;
      });
    if (lobby) {
      console.log('client is found in lobby: ', lobby);
      client.join(lobby.id); //ou alors lobby owner id?
    }
  }

  handleDisconnect(client: Socket) {}

  public emitBroadcast(eventName: string, data: any) {
    this.io.emit(eventName, data);
  }
}
