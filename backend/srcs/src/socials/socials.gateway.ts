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
    await this.emitToFriends(client.userId, 'on-status-update', {
      username: client.username,
      status: 'CONNECTED',
    });
  }

  async handleDisconnect(client: AuthSocket) {
    await this.emitToFriends(client.userId, 'on-status-update', {
      username: client.username,
      status: 'DISCONNECTED',
    });
  }

  @SubscribeMessage('status-update')
  async onStatusUpdate(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() status,
  ): Promise<void> {
    await this.socialsService.onStatusUpdate(client, status);
  }

  @SubscribeMessage('friend-request')
  async onFriendRequest(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() toUsername,
  ): Promise<void> {
    console.log('friend request received for ', toUsername);
    await this.socialsService.onFriendRequest(client, toUsername);
  }

  @SubscribeMessage('friend-request-reply')
  async onFriendRequestReply(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() payload: { fromUsername: string; isReplyTrue: boolean },
  ): Promise<any> {
    await this.socialsService.onFriendRequestReply(client, payload);
  }

  @SubscribeMessage('send-message')
  async sendMessage(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() payload: { message: string; users: string[] },
  ) {
    // await this.socialsService.sendMessage(client, payload);
  }

  emitToUser(receiverId: string, eventName: string, data: any) {
    this.io.to(receiverId).emit(eventName, data);
  }

  emitToList(userList: User[], eventName: string, data: any) {
    userList.forEach((user) => {
      this.emitToUser(user.id, eventName, data);
    });
  }
}
