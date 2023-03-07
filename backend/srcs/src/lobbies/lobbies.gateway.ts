import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { LobbiesService } from './lobbies.service';
import { Namespace, Socket } from 'socket.io';

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

  handleConnection(client: Socket, ...args: any[]) {
    const sockets = this.io.sockets;

    console.log(`WebSocket client with id: ${client.id} connected!`);
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
