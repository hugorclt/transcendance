import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    credentials: true,
    origin: ['http://localhost:3002'],
    methods: ['GET', 'POST'],
  },
})
export class SocketEvents implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    console.log('game gateway module init');
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }

  //event reception
  @SubscribeMessage('game')
  onNewMessage(@MessageBody() data: string) {
    console.log(data);
    //send an event
    this.server.emit('reply', {
      msg: 'NewMessage',
      content: data,
    });
  }
}
