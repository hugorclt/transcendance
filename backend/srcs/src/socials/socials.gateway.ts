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
import { Participant, Role, Room, User } from '@prisma/client';
import { WsNotFoundException } from 'src/exceptions/ws-exceptions/ws-exceptions';
import { PrismaService } from 'src/prisma/prisma.service';
import { getStatusFromVisibility } from 'src/users/utils/friend-status';
import { ParticipantService } from './rooms/participant/participant.service';
import { CreateMessageDto } from './rooms/messages/dto/create-message.dto';

@Injectable()
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: 'socials',
})
export class SocialsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private prisma: PrismaService,
    private participantService: ParticipantService,
  ) {}

  @WebSocketServer()
  public io: Namespace;

  //===== LIFECYCLE METHODS =====
  afterInit() {
    console.log('SocialsGateway initialized');
    this.io.on('connection', (socket) => {});
  }

  async handleConnection(client: AuthSocket) {
    client.join(client.userId);
    this.sendStatusUpdate(client.userId);
  }

  async handleDisconnect(client: AuthSocket) {
    console.log('sids: ', this.io.adapter.sids);
    this.io.adapter.sids.get(client.id)?.forEach((room) => {
      console.log('user leaving room: ', room);
      client.leave(room);
    });
  }

  //===== STATUS / VISIBILITY =====
  async sendStatusUpdate(userId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        preferences: true,
        friends: true,
      },
    });
    this.emitToUser(user.id, 'on-self-status-update', user.status);
    if (user.preferences.visibility == 'VISIBLE') {
      this.emitToList(user.friends, 'on-friend-update', {
        username: user.username,
        avatar: user.avatar,
        status: user.status,
        id: user.id,
      });
    }
  }

  async sendVisibilityUpdate(userId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        preferences: true,
        friends: true,
      },
    });
    this.emitToUser(
      userId,
      'on-visibility-update',
      user.preferences.visibility,
    );
    let status = getStatusFromVisibility(
      user.status,
      user.preferences.visibility,
    );
    this.emitToList(user.friends, 'on-friend-update', {
      username: user.username,
      avatar: user.avatar,
      status: status,
      id: user.id,
    });
  }

  //====== CHAT / MESSAGES / ROOMS ======
  getSocketFromUserId(userId: string): AuthSocket {
    return this.io.adapter.rooms.get(userId)[0];
  }

  sendMessageToRoom(message: CreateMessageDto) {
    const client = this.getSocketFromUserId(message.senderId);
    if (!client) return;
    client.to(message.roomId).emit('on-new-message', message);
    this.emitToUser(message.roomId, 'on-chat-update', {
      lastMessage: message.content,
    });
  }

  removeFriend(removerId: string, friendRemoved: string) {
    this.emitToUser(removerId, 'on-friend-remove', friendRemoved);
  }

  async joinUsersToRoom(room: any, users: string[]) {
    const owner = await this.prisma.user.findUnique({
      where: { id: room.ownerId },
    });
    users.push(owner.username);
    users.map(async (user) => {
      const participant = await this.prisma.user.findUnique({
        where: { username: user },
      });
      if (!participant)
        throw new WsNotFoundException(
          "Participant can't join the room, refresh the page",
        );
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

  //==============================================================================================
  //                                            IMPORTANT NOTE: useful
  //==============================================================================================
  async joinUserToRoom(roomId: string, userId: string) {
    const socketId = (await this.io.adapter.sockets(new Set([userId])))
      .values()
      .next().value;
    if (!socketId) return;
    const socket = this.io.sockets.get(socketId);
    socket.join(roomId);
  }

  async leaveUserFromRoom(roomId: string, userId: string) {
    const socketId = (await this.io.adapter.sockets(new Set([userId])))
      .values()
      .next().value;
    if (!socketId) return;
    const socket = this.io.sockets.get(socketId);
    socket.leave(roomId);
  }
  //==============================================================================================

  @SubscribeMessage('kick-player')
  async kickUser(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody()
    payload: {
      roomId: string;
      userIdKicked: string;
    },
  ) {
    // const room = await this.prisma.room.findUnique({
    //   where: { id: payload.roomId },
    //   include: { room: true },
    // });
    // if (!room) return;
    // const kicker = this.isInRoom(client.userId, room);
    // if (!kicker || (kicker.role != Role.ADMIN && kicker.role != Role.OWNER))
    //   return;
    // const newRoom = await this.roomService.leaveRoom(
    //   payload.userIdKicked,
    //   payload.roomId,
    // );
    // console.log(newRoom);
    // if (!newRoom) return;
    // this.leaveUserFromRoom(payload.roomId, payload.userIdKicked);
    // this.emitToUser(payload.roomId, 'on-chat-update', {
    //   id: newRoom.id,
    //   participants: await this.participantService.createParticipantFromRoom(
    //     room,
    //   ),
    // });
    // this.emitToUser(payload.userIdKicked, 'on-chat-delete', {
    //   roomId: payload.roomId,
    // });
  }

  //====== UTILS =====
  emitToListString(userList: string[], eventName: string, data: any) {
    userList.forEach((user) => {
      this.emitToUser(user, eventName, data);
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

  isInRoom(userId: string, room: Room & { room: Participant[] }) {
    const user = room.room.filter(
      (participant) => participant.userId == userId,
    );
    if (user.length == 0) return undefined;
    return user[0];
  }
}
