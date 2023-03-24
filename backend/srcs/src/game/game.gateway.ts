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
import { Game } from './utils/game';
import { AuthSocket } from 'src/socket-adapter/types/AuthSocket.types';

@Injectable()
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({
  namespace: 'game',
})
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private usersService: UsersService) {}
  /*========================================================================*/
  
  
  @WebSocketServer()
  public io: Namespace;
  private game: Game;
  private player1: string;
  private player2: string;

  afterInit() {
    console.log('GameGateway initialized');
  }

  async handleConnection(client: AuthSocket) {
    await client.join(client.userId);
    if (!this.player1)
      this.player1 = client.userId;
    else
      this.player2 = client.userId; 
  }

  async handleDisconnect(client: any) {
    // toDO
  }


  /*======= start game =======*/

  @SubscribeMessage('start-game')
  async onStart(client: AuthSocket): Promise<void> {
    this.game.init();
    this.io.to(client.userId).emit("game-info", {
      cc: "hello",
      floorWidth: this.game.getField().getWidth(),
      floorLength: this.game.getField().getLength(),
      ballRadius: this.game.getBall().getRadius(),
      paddleWidth: this.game.getPaddle1().getWidth(),
      paddleLength: this.game.getPaddle1().getLength(),
      paddlePlayerStartX: this.game.getPaddle1().getPosition().x,
      paddlePlayerStartZ: this.game.getPaddle1().getPosition().z,
      paddleOppStartX: this.game.getPaddle2().getPosition().x,
      paddleOppStartZ: this.game.getPaddle2().getPosition().z,
      ballStartX: this.game.getBall().getPosition().x,
      ballStartZ: this.game.getBall().getPosition().z,
      scorePlayer1: this.game.getScoreboard().getPlayer1(),
      scorePlayer2: this.game.getScoreboard().getPlayer2(),
    })
    this.game.launch();
    setInterval(() => {
      this.io.to(client.userId).emit("ball-position", {
        x: this.game.getBall().getPosition().x,
        z: this.game.getBall().getPosition().z,
      });
    }, 1000 / 60); // 60 frames per second
  }

  /*======= pause game =======*/

  @SubscribeMessage('pause-game')
  async OnPause(): Promise<void> {}

  /*======= left move =======*/

  @SubscribeMessage('left-move')
  async OnLeftMove(client: AuthSocket): Promise<void> {
    if (client.userId == this.player1) {
      this.game.getPaddle1().moveLeft();
      this.io.to(client.userId).emit('player1', {
        x: this.game.getPaddle1().getPosition().x,
      })
    }
    if (client.userId == this.player2) {
      this.game.getPaddle2().moveLeft();
      this.io.to(client.userId).emit('player2', {
        x: this.game.getPaddle2().getPosition().x,
      })
    }
  }

  /*======= right move =======*/

  @SubscribeMessage('right-move')
  async OnRightMove(client: AuthSocket): Promise<void> {
    if (client.userId == this.player1) {
      this.game.getPaddle1().moveRight();
      this.io.to(client.userId).emit('player1', {
        x: this.game.getPaddle1().getPosition().x,
      })
    }
    if (client.userId == this.player2) {
      this.game.getPaddle2().moveRight();
      this.io.to(client.userId).emit('player2', {
        x: this.game.getPaddle2().getPosition().x,
      })
    }
  }
}
