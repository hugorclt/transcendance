import { OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io'
import { PrismaService } from 'src/prisma/prisma.service';


@WebSocketGateway()
export class MyGateway implements OnModuleInit {

    constructor (
        private readonly prisma : PrismaService

    ) {}

    @WebSocketServer()
    server: Server;

     onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log('Connected');
        });
     }

    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body : any) {
        console.log(body);
        this.server.emit('onMessage',{
            // user: username,
            msg: 'New Message',
            content: body,
        });
    }
}

// Chat (userInterface) needs to send  events to the websocket gateway using the websocket protocol (not http)
 