import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthSocket } from 'src/socket-adapter/types/AuthSocket.types';
import { User } from '@prisma/client';
import { ReturnUserEntity } from 'src/users/entities/return-user.entity';

@Injectable()
export class SocialsService {
  constructor(private readonly usersService: UsersService) {}

  public async getFriendList(userId: string): Promise<string[]> {
    const friends = await this.usersService.getUserFriends(userId);
    return friends.map((friend) => {
      return friend.id;
    });
  }

  public async getStatus(userId: string) : Promise<string> {
    return await this.usersService.getStatus(userId);
  }

  public async getIdOfUsername(username: string) : Promise<string> {
    const user = await this.usersService.findOneByUsername(username);
    return user.id;
  }

  public async onFriendRequestReply(
    client: AuthSocket,
    payload: { fromUsername: string; isReplyTrue: boolean },
  ): Promise<ReturnUserEntity> {
    const asker = await this.usersService.findOneByUsername(
      payload.fromUsername,
    );
    const replyer = await this.usersService.findOne(client.userId);
    if (payload.isReplyTrue === true) {
      console.log("reply is true");
      await this.usersService.addFriend(asker.id, replyer.id);
      console.log("adding friends and end");
      return (asker);
    }
  }

  // public async joinRoom(clientSocket) {
  //   const userId = clientSocket.handshake.query.userId;
  //   const rooms = await this.roomService.findRoomsForUser(userId);
  //   rooms.forEach((room) => {
  //     clientSocket.join(room.id);
  //   });
  // }

  // public async leaveRoom(clientSocket) {
  //   const userId = clientSocket.handshake.query.userId;
  //   const rooms = await this.roomService.findRoomsForUser(userId);
  //   rooms.forEach((room) => {
  //     clientSocket.leave(room.id);
  //   });
  // }
}
