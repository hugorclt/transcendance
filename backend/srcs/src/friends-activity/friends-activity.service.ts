import { Injectable, NotFoundException } from '@nestjs/common';
import { ConnectedSocket } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FriendshipService } from 'src/friendship/friendship.service';
import { UsersService } from 'src/users/users.service';
import { Socket } from 'socket.io';

@Injectable()
export class FriendsActivityService {
  constructor(
    private readonly usersService: UsersService,
    private readonly friendShipService: FriendshipService,
  ) {}

  public server: Server;

  public async handleConnection(client: any) {
    console.log('newConnection on FriendsActivitySocket');
    var clientId = client.handshake.query.userId;
    client.join(clientId);
    if (typeof clientId !== 'string') return;
    const user = await this.usersService.findOne(clientId);
    if (user) {
      this.emitToFriends(clientId, 'on-status-update', {
        username: user.username,
        avatar: user.avatar,
        status: 'CONNECTED',
      });
    }
  }

  public async onStatusUpdate(client: Socket, status: string): Promise<void> {
    if (typeof client.handshake.query.userId != 'string') return;

    const userId: string = client.handshake.query.userId;
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
    if (typeof client.handshake.query.userId != 'string') return;

    const userId: string = client.handshake.query.userId;
    const fromUser = await this.usersService.findOne(userId);
    try {
      const toUser = await this.usersService.findOneByUsername(toUsername);
      this.server.to(toUser.id).emit('on-friend-request', fromUser.username);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User not found');
      }
    }
  }

  public async onFriendRequestReply(
    client: Socket,
    payload: { fromUsername: string; isReplyTrue: boolean },
  ): Promise<void> {
    if (typeof client.handshake.query.userId != 'string') return;

    const userId: string = client.handshake.query.userId;
    const user1 = await this.usersService.findOneByUsername(
      payload.fromUsername,
    );
    const user2 = await this.usersService.findOne(userId);
    if (payload.isReplyTrue === true) {
      this.friendShipService.create({ username: payload.fromUsername }, userId);
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

  /* -------------------------------------------------------------------------- */
  /*                                    utils                                   */
  /* -------------------------------------------------------------------------- */

  public async emitToFriends(
    userId: string,
    eventName: string,
    data: any,
  ): Promise<void> {
    const friends = await this.friendShipService.findManyForOneUser(userId);
    const user = await this.usersService.findOne(userId);
    friends.forEach((friend) => {
      if (this.server) {
        this.server.to(friend.id).emit(eventName, {
          data,
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
        data,
      });
    }
  }
  public async sendMessage(client: Socket, payload: any): Promise<void> {}
}
