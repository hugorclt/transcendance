import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets';

@WebSocketGateway()
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server;
    users: number = 0;

    async handleConnection() {
        this.users++;

        this.server.emit('users', this.users);
    }

    async handleDisconnect() {
        this.users--;
        
        this.server.emit('users', this.users);
    }

    @SubscribeMessage('chat')
    async onChat(client, message) {
        client.broadcast.emit('chat', message);
    }
}