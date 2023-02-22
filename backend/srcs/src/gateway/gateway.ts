import { OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io'
import { PrismaService } from 'src/prisma/prisma.service';


@WebSocketGateway()
export class MyGateway implements OnModuleInit {

    // constructor (
    //     private readonly prisma : PrismaService

    // ) {}

    @WebSocketServer()
    server: Server;

     onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log('Connected');
        });
     }

     @SubscribeMessage('newMessage')
     onNewMessage(@MessageBody() payload: {username: string, content: string}) {
       console.log(payload);
       this.server.emit('onMessage', {
         username: payload.username,
         msg: 'New Message',
         content: payload.content,
       });
     }
}

// Chat (userInterface) needs to send  events to the websocket gateway using the websocket protocol (not http)
 