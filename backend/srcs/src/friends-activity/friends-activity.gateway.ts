import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendshipService } from 'src/friendship/friendship.service';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({
  namespace: '/status-update',
  cors: {
    credentials: true,
    origin: ['http://localhost:3002'],
    methods: ['GET', 'POST'],
  },
})
export class FriendsActivityGateway implements OnModuleInit, OnGatewayConnection {
  constructor(private prisma: PrismaService, private friendShip: FriendshipService, private usersService: UsersService) {};

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on("connection", (socket) => {
      
    });
  }

  async handleConnection(client: any) {
    var clientId = client.handshake.query.userId;
    client.join(clientId);
  }
  
  @SubscribeMessage('status-update')
  async onStatusUpdate(@MessageBody() payload: {id: string, status: string}): Promise<string> {
    const friends = await this.friendShip.findManyForOneUser(payload.id);
    const user = await this.usersService.findOne(payload.id);
    friends.forEach(friend => {
      this.server.to(friend.id).emit("on-status-update", {username: user.username, avatar: user.avatar, status: payload.status})
    });
    return 'Hello world!';
  }
}
