import { Injectable, UseFilters } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WsCatchAllFilter } from 'src/exceptions/ws-exceptions/ws-catch-all-filter';
import { UsersService } from 'src/users/users.service';
import { Namespace } from 'socket.io';

@Injectable()
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: 'game',
})
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private usersService: UsersService) {}

  @WebSocketServer()
  public io: Namespace;

  afterInit() {
    console.log('GameGateway initialized');
    this.io.on('connection', (socket) => {});
  }

  async handleConnection(client: any, ...args: any[]) {
    // toDO
  }

  async handleDisconnect(client: any) {
    // toDO
  }

  /*======= start game =======*/

  @SubscribeMessage('start-game')
  async onStart(): Promise<void> {}

  /*======= pause game =======*/

  @SubscribeMessage('pause-game')
  async OnPause(): Promise<void> {}

  /*======= left move =======*/

  @SubscribeMessage('left-move')
  async OnLeftMove(): Promise<void> {}

  /*======= right move =======*/

  @SubscribeMessage('left-move')
  async OnRightMove(): Promise<void> {}
}
