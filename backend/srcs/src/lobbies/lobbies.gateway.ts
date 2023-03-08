import { UseFilters } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { WsCatchAllFilter } from 'src/exceptions/ws-exceptions/ws-catch-all-filter';
import { AuthSocket } from 'src/socket-adapter/types/AuthSocket.types';
import { LobbiesService } from './lobbies.service';

// @UseFilters(WsCatchAllFilter())
@WebSocketGateway({
  namespace: 'lobbies',
})
export class LobbiesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly lobbiesService: LobbiesService) {}

  @WebSocketServer()
  io: Namespace;

  afterInit(): void {
    console.log('LobbiesGateway initialized');
  }

  handleConnection(client: AuthSocket, ...args: any[]) {
    const sockets = this.io.sockets;
    console.log(
      `WebSocket client with id: ${client.id} connected! UserId: ${client.userId}, Username: ${client.username}`,
    );
    console.log(`Number of connected clients: ${sockets.size}`);
    this.io.emit('hello', `from ${client.id}`); //emit to all connected clients (including the client itself)
  }

  handleDisconnect(client: Socket) {
    const sockets = this.io.sockets;
    console.log(`WebSocket client with id: ${client.id} disconnected!`);
    console.log(`Number of connected clients: ${sockets.size}`);
    this.io.emit('goodbye', `from ${client.id}`); //emit to all connected clients (including the client itself)
    //todo - remove client from poll and send particpants_updated event
  }

  @SubscribeMessage('test')
  async test() {
    throw new WsException({ filed: 'field', message: 'message' });
  }
}
