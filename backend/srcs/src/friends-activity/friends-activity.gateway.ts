import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FriendshipService } from 'src/friendship/friendship.service';
import { UsersService } from 'src/users/users.service';
import { Socket } from 'socket.io';
import { FriendsActivityService } from './friends-activity.service';

@WebSocketGateway({
  namespace: '/status',
  cors: {
    credentials: true,
    origin: ['http://localhost:3002'],
    methods: ['GET', 'POST'],
  },
})
export class FriendsActivityGateway {
  constructor(
    private friendShip: FriendshipService,
    private usersService: UsersService,
    private friendsActivityService: FriendsActivityService,
  ) {}

  @WebSocketServer()
  public server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {});
  }

  afterInit(server: Server) {
    this.friendsActivityService.socket = server;
  }

  async emitToFriends(
    userId: string,
    eventName: string,
    data: any,
  ): Promise<void> {
    const friends = await this.friendShip.findManyForOneUser(userId);
    const user = await this.usersService.findOne(userId);
    friends.forEach((friend) => {
      this.server.to(friend.id).emit(eventName, {
        username: user.username,
        avatar: user.avatar,
        ...data,
      });
    });
  }

  @SubscribeMessage('status-update')
  async onStatusUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() status,
  ): Promise<void> {
    if (typeof client.handshake.query.userId != 'string') return;
    const userId: string = client.handshake.query.userId;
    const user = await this.usersService.findOne(userId);
    this.emitToFriends(userId, 'on-status-update', {
      username: user.username,
      avatar: user.avatar,
      status: status,
    });
  }

  @SubscribeMessage('friend-request')
  async onFriendRequest(
    @ConnectedSocket() client: Socket,
    @MessageBody() toUsername,
  ): Promise<void> {
    if (typeof client.handshake.query.userId != 'string') return;
    const userId: string = client.handshake.query.userId;
    const fromUser = await this.usersService.findOne(userId);
    try {
      const toUser = await this.usersService.findOneByUsername(toUsername);
      this.server.to(toUser.id).emit('on-friend-request', fromUser.username);
    } catch (NotFoundException) {}
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
      this.server.to(user1.id).emit('on-status-update', {
        username: user2.username,
        avatar: user2.avatar,
        status: user2.status,
      });
      this.server.to(user2.id).emit('on-status-update', {
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

    this.server.to(user2.id).emit('on-message-sent', {
      message: payload.message,
      sender: user1.username,
    });
  }
}
