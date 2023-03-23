import { Paddle } from './paddle';
import { Pitch } from './pitch';
import { Camera } from './camera';
import { Ball } from './ball';
import { Scoreboard } from './scoreboard';

export class Game {
  private readonly pitch: Pitch;
  private readonly ball: Ball;
  private readonly paddleA: Paddle;
  private readonly paddleB: Paddle;
  private readonly scoreboard: Scoreboard;

  constructor(
    pitchWidth: number,
    pitchHeight: number,
    pitchDepth: number,
    pitchWallThickness: number,
    ballX: number,
    ballZ: number,
    ballVX: number,
    ballVZ: number,
    ballRadius: number,
    ballMass: number,
    paddleWidth: number,
    paddleHeight: number,
    paddleDepth: number,
    paddleMass: number,
    paddleSpeed: number,
    scoreboardTotalTime: number,
    scoreboardRemainingTime: number,
    scoreboardScoreA: number,
    scoreboardScoreB: number,
    scoreboardScoreToWin: number,
  ) {
    const pitch = new Pitch(
      pitchWidth,
      pitchHeight,
      pitchDepth,
      pitchWallThickness,
    );
    const ball = new Ball(ballX, ballZ, ballVX, ballVZ, ballRadius, ballMass);
    const paddleA = new Paddle(
      pitchWidth / 2,
      pitchHeight / 2,
      0,
      paddleWidth,
      paddleHeight,
      paddleDepth,
      paddleMass,
      paddleSpeed
    );
    const paddleB = new Paddle(
      pitchWidth / 2,
      pitchHeight / 2,
      pitchDepth,
      paddleWidth,
      paddleHeight,
      paddleDepth,
      paddleMass,
      paddleSpeed
    );
    const scoreboard = new Scoreboard(
      scoreboardTotalTime,
      scoreboardRemainingTime,
      scoreboardScoreA,
      scoreboardScoreB,
      scoreboardScoreToWin,
    );

    this.pitch = pitch;
    this.ball = ball;
    this.paddleA = paddleA;
    this.paddleB = paddleB;
    this.scoreboard = scoreboard;
  }


  loop(dt: number) {
    this.pitch.update(dt);
    this.ball.update(dt);
    // this.paddleA.update();
    // this.paddleB.update();
    // this.scoreboard.update();
  }
}
