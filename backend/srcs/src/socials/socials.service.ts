import { Injectable } from '@nestjs/common';
import { ReturnUserEntity } from 'src/users/entities/return-user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SocialsService {
  constructor(private usersService: UsersService) {}

  async getUserByUsername(username: string): Promise<ReturnUserEntity> {
    const user = await this.usersService.findOneByUsername(username);
    return user;
  }

  async getUserById(id: string): Promise<ReturnUserEntity> {
    console.log('usersService: ', this.usersService);
    const user = await this.usersService.findOne(id);
    return user;
  }

  async getUserFriendsIds(userId: string): Promise<string[]> {
    const friends = await this.usersService.getUserFriends(userId);
    const friendsIds = friends.map((friend) => friend.id);
    return friendsIds;
  }

  async addFriend(askerId: string, replyerId: string): Promise<void> {
    await this.usersService.addFriend(askerId, replyerId);
  }
}
