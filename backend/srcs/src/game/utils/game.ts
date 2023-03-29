import { Ball } from './ball';
import { Paddle } from './paddle';
import { Scoreboard } from './scoreboard';
import { Field } from './field';
import { isValidationOptions } from 'class-validator';
import { zipAll } from 'rxjs';

export class Game {
  private ball: Ball;
  private paddle1: Paddle;
  private paddle2: Paddle;
  private scoreboard: Scoreboard;
  private field: Field;

  constructor(
    ball: Ball,
    paddle1: Paddle,
    paddle2: Paddle,
    scoreboard: Scoreboard,
    field: Field,
  ) {
    this.ball = ball;
    this.paddle1 = paddle1;
    this.paddle2 = paddle2;
    this.scoreboard = scoreboard;
    this.field = field;
  }

  startBallMovement() {
    console.log("start-ball-movement");
    const direction = Math.random() > 0.5 ? -1 : 1;
    this.ball.setVelocity({ x: 0, z: direction * 0.3 }); // this is a possibility 
    // this.ball.setVelocity({x:0, z:1});
    this.ball.setStopped(false);
  }
d
  processBallMovement() {
    if (!this.ball.getVelocity()) this.startBallMovement();

    if (this.ball.getStopped() == true) return;

    this.updateBallPosition();

    if (this.isSideCollision() == true) {
        const newBallVelocity = this.ball.getVelocity().x * -1;
        this.ball.setVelocityX(newBallVelocity);
    }

    if (this.isPaddleCollision1()) {
      this.hitBallBack(this.paddle1);
    }

    if (this.isPaddleCollision2()) {
      this.hitBallBack(this.paddle2);
    }

    if (this.isGoalTeam1()) return;

    if (this.isGoalTeam2()) return;
  }

  calculateParabola(z: number, vertexH:number): number {
    const roots = [-32, 32];
    const vertex = [0, vertexH];
    const a = 1 / (4 * (vertex[1] - roots[1]));
    const y = a * Math.pow(z - vertex[0], 2) + vertex[1];
    return y;
  }
  

  updateBallPosition() {
    const ballPos = this.ball.getPosition();

    ballPos.x += this.ball.getVelocity().x;
    ballPos.z += this.ball.getVelocity().z;

    ballPos.y = this.calculateParabola(ballPos.z, 20);

    this.ball.setPositionX(ballPos.x);
    this.ball.setPositionZ(ballPos.z);
    this.ball.setPositionY(ballPos.y);
  }

  isSideCollision() {
    const ballX = this.ball.getPosition().x;
    const ballRadius = this.ball.getRadius();
    const halfFieldWidth = this.field.getWidth() / 2;

    return (
      ballX - ballRadius < -halfFieldWidth ||
      ballX + ballRadius > halfFieldWidth
    );
  }

  isPaddleCollision1() {
    const ballZ = this.ball.getPosition().z;
    const ballRadius = this.ball.getRadius();
    const paddle1Z = this.paddle1.getPosition().z;

    return ballZ + ballRadius >= paddle1Z && this.isBallAlignedWithPaddle(this.paddle1);
  }

  isPaddleCollision2() {
    const ballZ = this.ball.getPosition().z;
    const ballRadius = this.ball.getRadius();
    const paddle2Z = this.paddle2.getPosition().z;

    return ballZ - ballRadius <= paddle2Z && this.isBallAlignedWithPaddle(this.paddle2);
  }
  isBallAlignedWithPaddle(paddle: Paddle) {
    const halfPaddleWidth = paddle.getWidth() / 2;
    const paddlePosX = paddle.getPosition().x;
    const ballX = this.ball.getPosition().x;

    return (
      ballX > paddlePosX - halfPaddleWidth &&
      ballX < paddlePosX + halfPaddleWidth
    );
  }

  hitBallBack(paddle: Paddle) {
    console.log("hitBall");
    const ballX = this.ball.getPosition().x;
    const paddlePosX = paddle.getPosition().x;

    const newVelocityX = (ballX - paddlePosX) / 5;
    const newVelocityZ = this.ball.getVelocity().z * -1;

    this.ball.setVelocityX(newVelocityX);
    this.ball.setVelocityZ(newVelocityZ);
  }

  isGoalTeam2() {
    const ballZ = this.ball.getPosition().z;
    const hallfFieldLength = this.field.getLength() /2;

    if (ballZ > hallfFieldLength + 2) {
      this.scoreboard.incrementPlayer2();
      this.stopBall();
      this.reset();
      return true;
    } else return false;
  }

  isGoalTeam1() {
    const ballZ = this.ball.getPosition().z;
    const hallfFieldLength = this.field.getLength() /2;

    if (ballZ < -hallfFieldLength - 2) {
      this.scoreboard.incrementPlayer1();
      this.stopBall();
      this.reset();
      return true;
    } else return false;
  }

  stopBall() {
    this.ball.setStopped(true);
  }

  reset() {
    setTimeout(() => {
      this.ball.setPositionX(0);
      this.ball.setPositionY(0);
      this.ball.setPositionZ(0);
      this.ball.setVelocityX(0);
      this.ball.setVelocityZ(0);
      this.ball.setVelocity(null);
    }, 2000);
  }
  

  async init() {
    const BALL_X = 0;
    const BALL_Y = 10;
    const BALL_Z = 0;
    const FIELD_WIDTH = 32; //this.field.getWidth();
    const FIELD_LENGTH = 64; //this.field.getLength();
    const BALL_RADIUS = 0.5; //this.ball.getRadius();
    const PADDLE_WIDTH = 5;
    const PADDLE_LENGTH = 2;

    this.paddle1.setWidth(PADDLE_WIDTH);
    this.paddle1.setLength(PADDLE_LENGTH);
    this.paddle2.setWidth(PADDLE_WIDTH);
    this.paddle2.setLength(PADDLE_LENGTH);
    this.ball.setRadius(BALL_RADIUS);
    this.field.setLength(FIELD_LENGTH);
    this.field.setWidth(FIELD_WIDTH);
    this.paddle1.setPosition(0, FIELD_LENGTH / 2);
    this.paddle2.setPosition(0, -FIELD_LENGTH / 2);
    this.ball.setPositionX(BALL_X);
    this.ball.setPositionY(BALL_Y);
    this.ball.setPositionZ(BALL_Z);

  }

  async launch() {
    this.processBallMovement();
  }

  getBall() {
    return this.ball;
  }

  getPaddle1() {
    return this.paddle1;
  }

  getPaddle2() {
    return this.paddle2;
  }

  getScoreboard() {
    return this.scoreboard;
  }

  getField() {
    return this.field;
  }
}