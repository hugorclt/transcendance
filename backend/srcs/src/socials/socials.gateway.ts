import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { Injectable, UseFilters } from '@nestjs/common';
import { WsCatchAllFilter } from 'src/exceptions/ws-exceptions/ws-catch-all-filter';
import { AuthSocket } from 'src/socket-adapter/types/AuthSocket.types';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';
import { RoomsService } from './rooms/rooms.service';
import { MessagesService } from './rooms/messages/messages.service';

@Injectable()
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: 'socials',
})
export class SocialsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private usersService: UsersService,
    private roomService: RoomsService,
    private messageService: MessagesService,
  ) {}

  @WebSocketServer()
  public io: Namespace;

  afterInit() {
    console.log('SocialsGateway initialized');
    this.io.on('connection', (socket) => {});
  }

  async handleConnection(client: AuthSocket) {
    client.join(client.userId);
    const user = await this.usersService.findOne(client.userId);
    this.emitToList(
      await this.usersService.getUserFriends(client.userId),
      'on-status-update',
      { username: user.username, avatar: user.avatar, status: user.status },
    );
    const rooms = await this.roomService.findRoomsForUser(client.userId);
    rooms.map((room) => {
      client.join(room.id);
    });
  }

  async handleDisconnect(client: AuthSocket) {
    client.leave(client.userId);
    const rooms = await this.roomService.findRoomsForUser(client.userId);
    rooms.map((room) => {
      client.leave(room.id);
    });
  }

  async sendStatusUpdate(user: {
    username: string;
    avatar: string;
    userId: string;
    status: string;
  }): Promise<void> {
    const friends = await this.usersService.getUserFriends(user.userId);
    this.emitToList(friends, 'on-status-update', {
      username: user.username,
      avatar: user.avatar,
      status: user.status,
    });
    this.emitToUser(user.userId, 'on-self-status-update', user.status);
  }

  @SubscribeMessage('friend-request')
  async onFriendRequest(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() toUsername,
  ): Promise<void> {
    const user = await this.usersService.findOneByUsername(toUsername);
    this.emitToUser(user.id, 'on-friend-request', client.username);
  }

  @SubscribeMessage('friend-request-reply')
  async onFriendRequestReply(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() payload: { fromUsername: string; isReplyTrue: boolean },
  ): Promise<any> {
    const asker = await this.usersService.findOneByUsername(
      payload.fromUsername,
    );
    const replyer = await this.usersService.findOne(client.userId);
    if (payload.isReplyTrue === true)
      await this.usersService.addFriend(asker.id, replyer.id);
    else return;
    this.emitToUser(asker.id, 'on-status-update', {
      username: client.username,
      status: replyer.status,
      avatar: replyer.avatar,
    });
    this.emitToUser(client.id, 'on-status-update', {
      username: asker.username,
      status: asker.status,
      avatar: replyer.avatar,
    });
  }

  @SubscribeMessage('new-message')
  async newMessage(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() payload: { message: string; roomName: string },
  ) {
    const sender = await this.usersService.findOne(client.userId);
    if (!sender) return; //throw error not found
    const room = await this.roomService.findOneByName(payload.roomName);
    if (!room) return; // throw error not found
    await this.messageService.create({
      content: payload.message,
      senderId: sender.id,
      roomId: room.id,
    });
    this.io.to(room.id).emit('on-new-message', {
      sender: sender.username,
      message: payload.message,
      roomName: payload.roomName,
    });

    this.io.to(room.id).emit('on-chat-update', {
      avatar: room.avatar,
      name: room.name,
      lastMessage: payload.message,
    });
  }

  emitToUser(receiverId: string, eventName: string, data: any) {
    this.io.to(receiverId).emit(eventName, data);
  }

  emitToList(userList: User[], eventName: string, data: any) {
    userList.forEach((user) => {
      this.emitToUser(user.id, eventName, data);
    });
  }

  removeFriend(removerId: string, friendRemoved: string) {
    this.emitToUser(removerId, 'on-removed-friend', friendRemoved);
  }

  addChatToHistory(
    ownerId: string,
    roomName: string,
    lastMessage: string,
    avatar: string,
  ) {
    this.emitToUser(ownerId, 'on-chat-update', {
      avatar: avatar,
      name: roomName,
      lastMessage: lastMessage,
    });
  }

  async joinUserToRoom(room: any, users: string[]) {
    const owner = await this.usersService.findOne(room.ownerId);
    users.push(owner.username);
    users.map(async (user) => {
      const participant = await this.usersService.findOneByUsername(user);
      if (!participant) return; //error not found
      const socketId = (
        await this.io.adapter.sockets(new Set([participant.id]))
      )
        .values()
        .next().value;
      if (!socketId) return;
      const socket = this.io.sockets.get(socketId);
      socket.join(room.id);
    });
  }
}
