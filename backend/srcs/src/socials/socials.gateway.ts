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
import { Namespace, Socket } from 'socket.io';
import { Injectable, UseFilters } from '@nestjs/common';
import { WsCatchAllFilter } from '../exceptions/ws-exceptions/ws-catch-all-filter';
import { AuthSocket } from 'src/socket-adapter/types/AuthSocket.types';
import { Participant, Role, Room, User } from '@prisma/client';
import { WsNotFoundException } from '../exceptions/ws-exceptions/ws-exceptions';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './rooms/messages/dto/create-message.dto';
import { ReturnRoomEntity } from './rooms/entities/room.entity';

@Injectable()
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: 'socials',
})
export class SocialsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private prisma: PrismaService) {}

  @WebSocketServer()
  public io: Namespace;

  afterInit() {
    this.io.on('connection', (socket) => {});
  }

  async handleConnection(client: AuthSocket) {
    const user = await this.prisma.user.update({
      where: {
        id: client.userId,
      },
      data: {
        status: 'CONNECTED',
      },
      include: {
        friends: true,
      },
    });
    await this.emitToList(user.friends, 'on-friend-update', {
      id: user.id,
      status: user.status,
    });
    const rooms = await this.prisma.room.findMany({
      where: {
        participants: {
          some: {
            userId: client.userId,
          },
        },
      },
    });
    if (!rooms) return;
    await Promise.all(
      rooms.map((room) => {
        client.join(room.id);
      }),
    );
    await client.join(client.userId);
  }

  async handleDisconnect(client: AuthSocket) {
    const user = await this.prisma.user.update({
      where: {
        id: client.userId,
      },
      data: {
        status: 'DISCONNECTED',
      },
      include: {
        friends: true,
      },
    });
    await this.emitToList(user.friends, 'on-friend-update', {
      id: user.id,
      status: user.status,
    });
  }

  getSocketFromUserId(userId: string): Socket {
    const socketId = this.io.adapter.rooms.get(userId).values().next().value;
    return this.io.sockets.get(socketId);
  }

  async sendMessageToRoom(
    message: CreateMessageDto,
    participants: Participant[],
  ) {
    const client = this.getSocketFromUserId(message.senderId);
    if (!client) return;
    participants.forEach(async (participant) => {
      const test = await this.checkIfUserBlocked(
        participant.userId,
        message.senderId,
      );
      if (!test) {
        client.to(participant.userId).emit('on-new-message', message);
        this.emitToUser(participant.userId, 'on-chat-update', {
          id: message.roomId,
          lastMessage: message.content,
        });
      }
    });
  }

  async checkIfUserBlocked(userId: string, userBlockedId: string) {
    const userTo = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        isBloqued: true,
      },
    });
    const isBloqued = userTo.isBloqued.some(
      (blocked) => blocked.id == userBlockedId,
    );
    if (isBloqued) return true;
    return false;
  }

  removeFriend(removerId: string, friendRemoved: string) {
    this.emitToUser(removerId, 'on-friend-remove', friendRemoved);
  }

  async joinUsersToRoom(room: any, usersId: string[]) {
    await Promise.all(
      usersId.map(async (userId) => {
        const participant = await this.prisma.user.findUnique({
          where: { id: userId },
        });
        if (!participant)
          throw new WsNotFoundException(
            "Participant can't join the room, refresh the page",
          );
        await this.joinUserToRoom(room.id, participant.id);
      }),
    );
  }

  async joinUserToRoom(roomId: string, userId: string) {
    const socketId = (await this.io.adapter.sockets(new Set([userId])))
      .values()
      .next().value;
    if (!socketId) return;
    const socket = this.io.sockets.get(socketId);
    await socket.join(roomId);
  }

  async leaveUserFromRoom(roomId: string, userId: string) {
    const socketId = (await this.io.adapter.sockets(new Set([userId])))
      .values()
      .next().value;
    if (!socketId) return;
    const socket = this.io.sockets.get(socketId);
    socket.leave(roomId);
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

  emitRoomCreated(ownerId: string, room: ReturnRoomEntity) {
    const socket = this.getSocketFromUserId(ownerId);
    if (!socket) return;
    socket.to(room.id).emit('on-chat-update', room);
  }
}
