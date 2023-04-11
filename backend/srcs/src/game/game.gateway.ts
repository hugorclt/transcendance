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
import { Ball } from './utils/ball';
import { Paddle } from './utils/paddle';
import { Scoreboard } from './utils/scoreboard';
import { Field } from './utils/field';
import { SpecialShot } from './utils/specialShot';

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
    this.game = new Game(
      new Ball({ x: 0, y: 0, z: 0 }, 0, undefined, false),
      new Paddle(0, 0, { x: 0, z: 0 }, new SpecialShot("red")),
      new Paddle(0, 0, { x: 0, z: 0 }, new SpecialShot("blue")),
      new Scoreboard(0, 0),
      new Field(0, 0),
    );
  }

  async handleConnection(client: AuthSocket) {
    await client.join(client.userId);
    if (!this.player1) this.player1 = client.userId;
    else this.player2 = client.userId;
  }

  async handleDisconnect(client: any) {
    // toDO
  }

  /*======= start game & process ball =======*/

  @SubscribeMessage('start-game')
  async onStart(client: AuthSocket): Promise<void> {
    await this.game.init();
    this.io.to(client.userId).emit('game-info', {
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
      ballStartY: this.game.getBall().getPosition().y,
      ballStartZ: this.game.getBall().getPosition().z,
      scorePlayer1: this.game.getScoreboard().getPlayer1(),
      scorePlayer2: this.game.getScoreboard().getPlayer2(),
      chargePlayer1: this.game.getPaddle1().getSpecialShot().getCharge(),
      velocityX: this.game.getBall().getVelocity(),
    });
    this.game.launch();
    setInterval(() => {
      this.game.processBallMovement()
      this.io.to(client.userId).emit('ball', {
        x: this.game.getBall().getPosition().x,
        y: this.game.getBall().getPosition().y,
        z: this.game.getBall().getPosition().z, 
        vx: this.game.getBall().getVelocity().x,
      });

      this.io.to(client.userId).emit('player2', {
        x: this.game.getPaddle2().getPosition().x,
      });

      this.io.to(client.userId).emit('charge', {
        charge: this.game.getPaddle1().getSpecialShot().getCharge(),
      })
      this.io.to(client.userId).emit('score', { 
        scorePlayer1: this.game.getScoreboard().getPlayer1(),
        scorePlayer2: this.game.getScoreboard().getPlayer2(),
      })
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
      });
    }
    if (client.userId == this.player2) {
      this.game.getPaddle2().moveLeft();
      this.io.to(client.userId).emit('player2', {
        x: this.game.getPaddle2().getPosition().x,
      });
    }
  }

  /*======= right move =======*/

  @SubscribeMessage('right-move')
  async OnRightMove(client: AuthSocket): Promise<void> {
    if (client.userId == this.player1) {
      this.game.getPaddle1().moveRight();
      this.io.to(client.userId).emit('player1', {
        x: this.game.getPaddle1().getPosition().x,
      });
    }
    if (client.userId == this.player2) {
      this.game.getPaddle2().moveRight();
      this.io.to(client.userId).emit('player2', {
        x: this.game.getPaddle2().getPosition().x,
      });
    }
  }

  /*======= special shot =======*/

  @SubscribeMessage('special-shot')
  async OnSpecialShot(client: AuthSocket): Promise<void> {
    if (client.userId == this.player1) {
      this.game.getPaddle1().trigger()
    }
    if (client.userId == this.player2) {

    }
  }
}