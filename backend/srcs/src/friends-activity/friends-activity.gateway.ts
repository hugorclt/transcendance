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

  @SubscribeMessage('friend-request')
  async onFriendRequest(@MessageBody() payload : {fromId: string, toUsername: string}) : Promise<any> {
    console.log("DEMANDE DE GROS BROUTEUR : feliciations vous aveicjweiuhqweiu ", payload);

    const fromUser = await this.usersService.findOne(payload.fromId);
    try {
      const toUser = await this.usersService.findOneByUsername(payload.toUsername);
      this.server.to(toUser.id).emit("on-friend-request", fromUser.username);
      console.log("to user:", toUser);
    } catch (NotFoundException) {
      // return;
    }
    return;
  }

  @SubscribeMessage('friend-request-reply')
  async onFriendRequestReply(@MessageBody() payload : {fromUsername : string, toId: string, isReplyTrue: boolean}) : Promise <any> {
    const user1 = await this.usersService.findOneByUsername(payload.fromUsername);
    const user2 = await this.usersService.findOne(payload.toId);
    if (payload.isReplyTrue === true)
    {
      this.friendShip.create({username : payload.fromUsername}, payload.toId);
      this.server.to(user1.id).emit("on-status-update", {username : user2.username, avatar : user2.avatar, status : user2.status});
      this.server.to(user2.id).emit("on-status-update", {username : user1.username, avatar : user1.avatar, status : user1.status});
    }
  }
}