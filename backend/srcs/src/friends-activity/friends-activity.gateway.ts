import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnModuleInit, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendshipService } from 'src/friendship/friendship.service';
import { UsersService } from 'src/users/users.service';
import { AccessAuthGard } from 'src/auth/utils/guards';
import { Socket } from 'socket.io';
import { RoomsService } from 'src/rooms/rooms.service';
import { ParticipantService } from 'src/rooms/participant/participant.service';
import { Role } from '@prisma/client';

@WebSocketGateway({
  namespace: '/status',
  cors: {
    credentials: true,
    origin: ['http://localhost:3002'],
    methods: ['GET', 'POST'],
  },
})
// @UseGuards(AccessAuthGard) // a rajouter plus tard
export class FriendsActivityGateway
  implements OnModuleInit, OnGatewayConnection
{
  constructor(
    private friendShip: FriendshipService,
    private usersService: UsersService,
    private roomsService: RoomsService,
    private participantService: ParticipantService,
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

  @SubscribeMessage('status-update')
  async onStatusUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() status,
  ): Promise<string> {
    if (typeof client.handshake.query.userId != 'string') return;
    const userId: string = client.handshake.query.userId;
    const friends = await this.friendShip.findManyForOneUser(userId);
    const user = await this.usersService.findOne(userId);
    friends.forEach((friend) => {
      this.server
        .to(friend.id)
        .emit('on-status-update', {
          username: user.username,
          avatar: user.avatar,
          status: status,
        });
    });
    return 'Hello world!'; // change return value
  }

  @SubscribeMessage('friend-request')
  async onFriendRequest(
    @ConnectedSocket() client: Socket,
    @MessageBody() toUsername,
  ): Promise<any> {
    if (typeof client.handshake.query.userId != 'string') return;
    const userId: string = client.handshake.query.userId;
    const fromUser = await this.usersService.findOne(userId);
    try {
      const toUser = await this.usersService.findOneByUsername(toUsername);
      this.server.to(toUser.id).emit('on-friend-request', fromUser.username);
    } catch (NotFoundException) {
      return; // return error
    }
    return;
  }

  @SubscribeMessage('friend-request-reply')
  async onFriendRequestReply(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { fromUsername: string; isReplyTrue: boolean },
  ): Promise<any> {
    if (typeof client.handshake.query.userId != 'string') return;
    const userId: string = client.handshake.query.userId;
    const user1 = await this.usersService.findOneByUsername(
      payload.fromUsername,
    );
    const user2 = await this.usersService.findOne(userId);
    if (payload.isReplyTrue === true) {
      this.friendShip.create({ username: payload.fromUsername }, userId);
      this.server
        .to(user1.id)
        .emit('on-status-update', {
          username: user2.username,
          avatar: user2.avatar,
          status: user2.status,
        });
      this.server
        .to(user2.id)
        .emit('on-status-update', {
          username: user1.username,
          avatar: user1.avatar,
          status: user1.status,
        });
    }
  }

  @SubscribeMessage('message-sent')
  async onMessageSent(
    @MessageBody()
    payload: {
      message: string;
      userFromId: string;
      userToName: string;
    },
  ) {
    const user2 = await this.usersService.findOneByUsername(payload.userToName);
    const user1 = await this.usersService.findOne(payload.userFromId);

    this.server
      .to(user2.id)
      .emit('on-message-sent', {
        message: payload.message,
        sender: user1.username,
      });
  }
}

// const room = await this.roomsService.create({name: user1.username + "_room", type: 0, adminId: user1.id});
// this.participantService.create({roomId: room.id, userId: user1.id, role: Role.ADMIN });
// this.participantService.create({roomId: room.id, userId: user2.id, role: Role.BASIC });