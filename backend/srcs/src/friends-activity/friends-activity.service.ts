import { Injectable } from "@nestjs/common";
import { Server } from 'socket.io';
import { FriendshipService } from "src/friendship/friendship.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class FriendsActivityService {

    constructor(private readonly friendshipService: FriendshipService,
                private readonly usersService: UsersService ) { }

    public socket: Server = null;


    async emitToFriends(
        userId: string,
        eventName: string,
        data: any,
      ): Promise<void> {
        const friends = await this.friendshipService.findManyForOneUser(userId);
        const user = await this.usersService.findOne(userId);
        friends.forEach((friend) => {
          this.socket.to(friend.id).emit(eventName, {
            username: user.username,
            avatar: user.avatar,
            ...data,
          });
        });
      }

}
