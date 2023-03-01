import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendshipService } from 'src/friendship/friendship.service';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({
  namespace: '/status',
  cors: {
    credentials: true,
    origin: ['http://localhost:3002'],
    methods: ['GET', 'POST'],
  },
})
export class FriendsActivityGateway
  implements OnModuleInit, OnGatewayConnection
{
  constructor(
    // private prisma: PrismaService,
    private friendShip: FriendshipService,
    private usersService: UsersService,
  ) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {});
  }

  async handleConnection(client: any) {
    var clientId = client.handshake.query.userId;
    client.join(clientId);
  }

  async emitToUser(userId: string, event: string, data: any): Promise<void> {
    this.server.to(userId).emit(event, data);
  }

  async emitToFriends(userId: string, event: string, data: any): Promise<void> {
    const friends = await this.friendShip.findManyForOneUser(userId);
    friends.forEach((friend) => {
      this.server.to(friend.id).emit(event, data);
    });
  }

  // @SubscribeMessage('status-update')
  // async onStatusUpdate(@MessageBody() payload: {id: string, status: string}): Promise<string> {
  //   const friends = await this.friendShip.findManyForOneUser(payload.id);
  //   const user = await this.usersService.findOne(payload.id);
  //   this.emitToFriends(payload.id, "on-status-update", {username: user.username, avatar: user.avatar, status: payload.status})
  //   friends.forEach(friend => {
  //     this.server.to(friend.id).emit("on-status-update", {username: user.username, avatar: user.avatar, status: payload.status})
  //   });
  //   return 'Hello world!';
  // }

  @SubscribeMessage('status-update')
  async onStatusUpdate(
    @MessageBody() payload: { id: string; status: string },
  ): Promise<void> {
    const user = await this.usersService.findOne(payload.id);
    this.emitToFriends(payload.id, 'on-status-update', {
      username: user.username,
      avatar: user.avatar,
      status: payload.status,
    });
  }

  // @SubscribeMessage('friend-request')
  // async onFriendRequest(
  //   @MessageBody() payload: { fromId: string; toUsername: string },
  // ): Promise<void> {
  //   const fromUser = await this.usersService.findOne(payload.fromId);
  //   try {
  //     const toUser = await this.usersService.findOneByUsername(
  //       payload.toUsername,
  //     );
  //     this.server.to(toUser.id).emit('on-friend-request', fromUser.username);
  //   } catch (NotFoundException) {
  //     // return;
  //   }
  // }

  @SubscribeMessage('friend-request')
  async onFriendRequest(
    @MessageBody() payload: { fromId: string; toUsername: string },
  ): Promise<void> {
    const fromUser = await this.usersService.findOne(payload.fromId);
    try {
      const toUser = await this.usersService.findOneByUsername(
        payload.toUsername,
      );
      this.emitToUser(toUser.id, 'on-friend-request', fromUser.username);
    } catch (NotFoundException) {
      // return;
    }
  }

  // @SubscribeMessage('friend-request-reply')
  // async onFriendRequestReply(
  //   @MessageBody()
  //   payload: {
  //     fromUsername: string;
  //     toId: string;
  //     isReplyTrue: boolean;
  //   },
  // ): Promise<void> {
  //   const user1 = await this.usersService.findOneByUsername(
  //     payload.fromUsername,
  //   );
  //   const user2 = await this.usersService.findOne(payload.toId);
  //   if (payload.isReplyTrue === true) {
  //     this.friendShip.create({ username: payload.fromUsername }, payload.toId);
  //     this.server
  //       .to(user1.id)
  //       .emit('on-status-update', {
  //         username: user2.username,
  //         avatar: user2.avatar,
  //         status: user2.status,
  //       });
  //     this.server
  //       .to(user2.id)
  //       .emit('on-status-update', {
  //         username: user1.username,
  //         avatar: user1.avatar,
  //         status: user1.status,
  //       });
  //   }
  // }

  @SubscribeMessage('friend-request-reply')
  async onFriendRequestReply(
    @MessageBody()
    payload: {
      fromUsername: string;
      toId: string;
      isReplyTrue: boolean;
    },
  ): Promise<void> {
    const user1 = await this.usersService.findOneByUsername(
      payload.fromUsername,
    );
    const user2 = await this.usersService.findOne(payload.toId);
    if (payload.isReplyTrue === true) {
      this.friendShip.create({ username: payload.fromUsername }, payload.toId);
      this.emitToUser(user1.id, 'on-status-update', {
        username: user2.username,
        avatar: user2.avatar,
        status: user2.status,
      });
      this.emitToUser(user2.id, 'on-status-update', {
        username: user1.username,
        avatar: user1.avatar,
        status: user1.status,
      });
    }
  }
}
