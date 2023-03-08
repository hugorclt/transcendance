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

@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: 'lobbies',
})
export class LobbiesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  io: Namespace;

  afterInit(): void {}

  handleConnection(client: AuthSocket, ...args: any[]) {
    const sockets = this.io.sockets;
    console.log(
      `WebSocket client with id: ${client.id} connected! UserId: ${client.userId}, Username: ${client.username}`,
    );
    console.log(`Number of connected clients: ${sockets.size}`);
    this.emitBroadcast('hello', `from ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const sockets = this.io.sockets;
    console.log(`WebSocket client with id: ${client.id} disconnected!`);
    console.log(`Number of connected clients: ${sockets.size}`);
    //todo - remove client from poll and send particpants_updated event
  }

  public emitBroadcast(eventName: string, data: any) {
    this.io.emit(eventName, data);
  }
}
