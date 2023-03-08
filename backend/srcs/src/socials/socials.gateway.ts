import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnModuleInit, UseFilters } from '@nestjs/common';
import { Socket } from 'socket.io';
import { SocialsService } from './socials.service';
import { WsCatchAllFilter } from 'src/exceptions/ws-exceptions/ws-catch-all-filter';

@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: '/status',
  cors: {
    credentials: true,
    origin: ['http://localhost:3002'],
    methods: ['GET', 'POST'],
  },
})
export class SocialsGateway implements OnModuleInit, OnGatewayConnection {
  constructor(private friendsActivityService: SocialsService) {}

  @WebSocketServer()
  public server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {});
  }

  afterInit(server: Server) {
    this.friendsActivityService.server = server;
  }

  async handleConnection(client: Socket) {
    await this.friendsActivityService.handleConnection(client);
  }

  @SubscribeMessage('status-update')
  async onStatusUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() status,
  ): Promise<void> {
    await this.friendsActivityService.onStatusUpdate(client, status);
  }

  @SubscribeMessage('friend-request')
  async onFriendRequest(
    @ConnectedSocket() client: Socket,
    @MessageBody() toUsername,
  ): Promise<void> {
    console.log('friend request received for ', toUsername);
    await this.friendsActivityService.onFriendRequest(client, toUsername);
  }

  @SubscribeMessage('friend-request-reply')
  async onFriendRequestReply(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { fromUsername: string; isReplyTrue: boolean },
  ): Promise<any> {
    await this.friendsActivityService.onFriendRequestReply(client, payload);
  }

  @SubscribeMessage('logout')
  async onLogout(
    @ConnectedSocket() client: Socket,
    @MessageBody() userId,
  ): Promise<void> {
    await this.friendsActivityService.onLogout(client, userId);
  }

  @SubscribeMessage('send-message')
  async sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { message: string; users: string[] },
  ) {
    // this.friendsActivityService.sendMessage(client, payload);
  }
}
