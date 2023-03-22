import { Ball } from "./ball";
import { Pitch } from "./pitch";

export class Scoreboard {
  private totalTime: number;
  private remainingTime: number;
  private scoreA: number;
  private scoreB: number;
  private scoreToWin: number;

  constructor(
    totalTime: number,
    remainingTime: number,
    scoreA: number,
    scoreB: number,
    scoreToWin: number
  ) {
    this.totalTime = totalTime;
    this.remainingTime = remainingTime;
    this.scoreA = scoreA;
    this.scoreB = scoreB;
    this.scoreToWin = scoreToWin;
  }

  update(dt: number) {
    return ;
  }

  checkForGoal(ball: Ball, pitch: Pitch) {
    const ballZ = ball.getZ();

    if (ballZ >= pitch.getDepth()) {
      this.scoreA += 1;
      return true;
    } else if (ballZ <= 0) {
      this.scoreB += 1;
      return true;
    }
    return false;
  }

  getTotalTime() {
    return this.totalTime;
  }

  setTotalTime(totalTime: number) {
    this.totalTime = totalTime;
  }

  getRemainingTime() {
    return this.remainingTime;
  }

  setRemainingTime(remainingTime: number) {
    this.remainingTime = remainingTime;
  }

  getScoreA() {
    return this.scoreA;
  }

  setScoreA(scoreA: number) {
    this.scoreA = scoreA;
  }

  getScoreB() {
    return this.scoreB;
  }

  setScoreB(scoreB: number) {
    this.scoreB = scoreB;
  }

  getScoreToWin() {
    return this.scoreToWin;
  }

  setScoreToWin(scoreToWin: number) {
    this.scoreToWin = scoreToWin;
  }
}
