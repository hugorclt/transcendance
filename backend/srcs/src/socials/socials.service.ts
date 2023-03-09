import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthSocket } from 'src/socket-adapter/types/AuthSocket.types';

@Injectable()
export class SocialsService {
  constructor(private readonly usersService: UsersService) {}

  public async onFriendRequestReply(
    client: AuthSocket,
    payload: { fromUsername: string; isReplyTrue: boolean },
  ): Promise<void> {
    const asker = await this.usersService.findOneByUsername(
      payload.fromUsername,
    );
    const replyer = await this.usersService.findOne(client.userId);
    if (payload.isReplyTrue === true) {
      await this.usersService.addFriend(asker.id, replyer.id);
      this.gateway.io.to(asker.id).emit('on-status-update', {
        username: replyer.username,
        status: replyer.status,
      });
      this.gateway.io.to(replyer.id).emit('on-status-update', {
        username: asker.username,
        status: asker.status,
      });
    }
  }
}
