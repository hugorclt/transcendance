import { Ball } from './ball';
import { Paddle } from './paddle';
import { Scoreboard } from './scoreboard';
import { Field } from './field';

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
    const direction = Math.random() > 0.5 ? -1 : 1;
    // this.ball.setVelocity({ x: 0, z: direction * 1 }); // this is a possibility 
    this.ball.setVelocity({x:1, z:0});
    this.ball.setStopped(false);
  }

  processBallMovement() {
    if (!this.ball.getVelocity()) this.startBallMovement();

    if (this.ball.getStopped() == true) return;

    this.updateBallPosition();

    if (this.isSideCollision() == true) {
        console.log("test");
      const newBallVelocity = this.ball.getVelocity().x * -1;
      this.ball.setVelocityX(newBallVelocity);
    }

    if (this.isPaddleCollision(this.paddle1)) {
      this.hitBallBack(this.paddle1);
    }

    if (this.isPaddleCollision(this.paddle2)) {
      this.hitBallBack(this.paddle2);
    }

    if (this.isGoalTeam1()) return;

    if (this.isGoalTeam2()) return;
  }

  updateBallPosition() {
    const ballPos = this.ball.getPosition();

    ballPos.x += this.ball.getVelocity().x;
    ballPos.z += this.ball.getVelocity().z;

    this.ball.setPositionX(ballPos.x);
    this.ball.setPositionZ(ballPos.z);
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

  isPaddleCollision(paddle: Paddle) {
    const ballZ = this.ball.getPosition().z;
    const ballRadius = this.ball.getRadius();
    const paddlePosZ = paddle.getPosition().z;
    const direction = this.ball.getVelocity().z > 0 ? 'up' : 'down';

    if (direction === 'up') {
      return (
        ballZ + ballRadius >= paddlePosZ && this.isBallAlignedWithPaddle(paddle)
      );
    } else if (direction === 'down') {
      return (
        ballZ - ballRadius <= paddlePosZ && this.isBallAlignedWithPaddle(paddle)
      );
    }
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
    const ballX = this.ball.getPosition().x;
    const paddlePosX = paddle.getPosition().x;

    const newVelocityX = (ballX - paddlePosX) / 5;
    const newVelocityZ = this.ball.getVelocity().z * -1;

    this.ball.setVelocityX(newVelocityX);
    this.ball.setVelocityZ(newVelocityZ);
  }

  isGoalTeam2() {
    const ballZ = this.ball.getPosition().z;
    const fieldZ = this.field.getLength();

    if (ballZ > fieldZ + 100) {
      this.scoreboard.incrementPlayer2();
      this.stopBall();
      this.reset();
      return true;
    } else return false;
  }

  isGoalTeam1() {
    const ballZ = this.ball.getPosition().z;
    const fieldZ = this.field.getLength();

    if (ballZ < fieldZ - 100) {
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
    this.ball.setPositionX(0);
    this.ball.setPositionY(0);
    this.ball.setPositionZ(0);
    this.ball.setVelocity(null);
  }

  async init() {
    const BALL_X = 0;
    const BALL_Y = 0;
    const BALL_Z = 0;
    const FIELD_WIDTH = 32; //this.field.getWidth();
    const FIELD_LENGTH = 64; //this.field.getLength();
    const BALL_RADIUS = 1; //this.ball.getRadius();
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