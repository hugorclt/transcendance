import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { AuthSocket } from 'src/socket-adapter/types/AuthSocket.types';

@WebSocketGateway({
  namespace: 'lobbies',
})
export class LobbiesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {}

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
}
