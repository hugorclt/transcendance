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
import { SocialsService } from './socials.service';
import { WsCatchAllFilter } from 'src/exceptions/ws-exceptions/ws-catch-all-filter';
import { AuthSocket } from 'src/socket-adapter/types/AuthSocket.types';
import { User } from '@prisma/client';

@Injectable()
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: 'socials',
})
export class SocialsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private socialsService: SocialsService) {}

  @WebSocketServer()
  public io: Namespace;

  afterInit() {
    console.log('SocialsGateway initialized');
    this.io.on('connection', (socket) => {});
  }

  async handleConnection(client: AuthSocket) {
    client.join(client.userId);
    this.emitToList(
      await this.socialsService.getFriendList(client.userId),
      'on-status-update',
      await this.socialsService.getStatus(client.userId),
    );
  }

  async handleDisconnect(client: AuthSocket) {
    client.leave(client.userId);
  }

  async sendStatusUpdate(user: {
    username: string;
    userId: string;
    status: string;
  }): Promise<void> {
    this.emitToList(
      await this.socialsService.getFriendList(user.userId),
      'on-status-update',
      user,
    );
    // await this.socialsService.onStatusUpdate(client, status);
  }

  @SubscribeMessage('friend-request')
  async onFriendRequest(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() toUsername,
  ): Promise<void> {
    console.log(
      'received friend request from ',
      client.username,
      ' to ',
      toUsername,
    );
    const id = await this.socialsService.getIdOfUsername(toUsername);
    this.emitToUser(id, 'on-friend-request', client.username);
  }

  @SubscribeMessage('friend-request-reply')
  async onFriendRequestReply(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() payload: { fromUsername: string; isReplyTrue: boolean },
  ): Promise<any> {
    console.log('friend request reply received');
    const asker = await this.socialsService.onFriendRequestReply(
      client,
      payload,
    );
    console.log('asker: ', asker);
    const replyerStatus = await this.socialsService.getStatus(client.id);
    console.log("replyer_status: ", replyerStatus)
    this.emitToUser(asker.id, 'on-status-update', {
      username: client.username,
      status: replyerStatus,
    });
    console.log('between emit');
    this.emitToUser(client.id, 'on-status-update', {
      username: asker.username,
      status: asker.status,
    });
    console.log(
      'sending new data to:  Asker.username',
      asker.username,
      ' replyer.username',
      client.username,
    );
  }

  emitToUser(receiverId: string, eventName: string, data: any) {
    console.log("sending data.... data: ", data, "to: ", receiverId);
    this.io.to(receiverId).emit(eventName, data);
    console.log("end sending data" );

  }

  emitToList(userList: string[], eventName: string, data: any) {
    userList.forEach((user) => {
      this.emitToUser(user, eventName, data);
    });
  }
}
