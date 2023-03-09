import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Server } from 'socket.io';
import { UsersService } from 'src/users/users.service';
import { Socket } from 'socket.io';
import { SocialsGateway } from './socials.gateway';
import { RoomsService } from './rooms/rooms.service';

@Injectable()
export class SocialsService {
  constructor(
    private readonly usersService: UsersService,
    private roomService: RoomsService,
  ) {}

  public server: Server;
  public clientsSocket: Map<string, any> = new Map();

  public async handleConnection(client: any) {
    var clientId = client.handshake.query.userId;
    const user = await this.usersService.findOne(clientId);

    this.clientsSocket.set(clientId, client);
    client.join(clientId);
    this.joinRoom(client);

    if (user) {
      this.emitToFriends(clientId, 'on-status-update', {
        username: user.username,
        avatar: user.avatar,
        status: 'CONNECTED',
      });
    }
  }

  public async handleDisconnect(client: any) {
    var clientId = client.handshake.query.userId as string;
    this.clientsSocket.delete(clientId);
    client.leave(clientId);
    this.leaveRoom(client);
  }

  public async onStatusUpdate(client: Socket, status: string): Promise<void> {
    const userId: string = client.handshake.query.userId as string;
    const user = await this.usersService.findOne(userId);
    this.emitToFriends(userId, 'on-status-update', {
      username: user.username,
      avatar: user.avatar,
      status: status,
    });
  }

  public async onFriendRequest(
    client: Socket,
    toUsername: string,
  ): Promise<void> {
    console.log("friend request received");
    const userId: string = client.handshake.query.userId as string;
    const fromUser = await this.usersService.findOne(userId);
    try {
      const toUser = await this.usersService.findOneByUsername(toUsername);
      this.server.to(toUser.id).emit('on-friend-request', fromUser.username);
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.log(toUsername);
      }
    }
  }

  public async onFriendRequestReply(
    client: Socket,
    payload: { fromUsername: string; isReplyTrue: boolean },
  ): Promise<void> {
    const userId: string = client.handshake.query.userId as string;
    const user1 = await this.usersService.findOneByUsername(
      payload.fromUsername,
    );
    const user2 = await this.usersService.findOne(userId);
    if (payload.isReplyTrue === true) {
      this.usersService.addFriend(user1.id, user2.id);
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

  public async onLogout(client: Socket, userId: string): Promise<void> {
    const user = await this.usersService.findOne(userId);
    this.emitToFriends(userId, 'on-status-update', {
      username: user.username,
      avatar: user.avatar,
      status: 'DISCONNECTED',
    });
  }

  public async connectClient(
    client: Socket,
    usersList: string[],
    roomId: string,
  ) {
    const userId = client.handshake.query.userId as string;
    const userList = await this.usersService.getUsers(usersList);

    this.clientsSocket.get(userId).join(roomId);
    userList.forEach(user => {
      this.clientsSocket.get(user.id).join(roomId);
    });
  }

  public async newMessage(client, message: string, roomName: string) {
    const userId = client.handshake.query.userId as string;
    const user = await this.usersService.findOne(userId);
    const room = await this.roomService.findOneByName(roomName);
    this.server.to(room.id).emit('on-new-message', {message: message, sender: user.username, roomName: room.name});
  }

  /* -------------------------------------------------------------------------- */
  /*                                    utils                                   */
  /* -------------------------------------------------------------------------- */

  public async emitToFriends(
    userId: string,
    eventName: string,
    data: any,
  ): Promise<void> {
    const friends = await this.usersService.getUserFriends(userId);
    const user = await this.usersService.findOne(userId);
    friends.forEach((friend) => {
      if (this.server) {
        this.server.to(friend.id).emit(eventName, {
          ...data,
        });
      }
    });
  }

  public async emitToUser(
    userId: string,
    eventName: string,
    data: any,
  ): Promise<void> {
    if (this.server) {
      this.server.to(userId).emit(eventName, {
        ...data,
      });
    }
  }

  public async joinRoom(clientSocket) {
    const userId = clientSocket.handshake.query.userId;
    const rooms = await this.roomService.findRoomsForUser(userId);
    rooms.forEach((room) => {
      clientSocket.join(room.id);
    });
  }

  public async leaveRoom(clientSocket) {
    const userId = clientSocket.handshake.query.userId;
    const rooms = await this.roomService.findRoomsForUser(userId);
    rooms.forEach((room) => {
      clientSocket.leave(room.id);
    });
  }
}
