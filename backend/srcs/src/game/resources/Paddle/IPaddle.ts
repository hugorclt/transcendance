import { EType } from 'shared/enum';
import { Ball } from '../Ball/Ball';
import { IObject } from '../interfaces/IObject';
import { TCollision } from '../types';
import { baseCollide, basePaddleCollide } from '../utils/collisions/baseColide';

export abstract class IPaddle extends IObject {
  protected specialCharge: number;
  protected superUnleashed: boolean;
  public collide(ball: Ball): TCollision {
    const collision = basePaddleCollide(ball, this._hitBox);
    return { ...collision, type: EType.PADDLE };
  }

  public getCharge() {
    return this.specialCharge;
  }

  public goSuper() {}
  public moveLeft() {
    this.moveX(-0.2);
  }
  public moveRight() {
    this.moveX(0.2);
  }
  public moveUp() {
    this.moveY(0.2);
  }
  public moveDown() {
    this.moveY(-0.2);
  }
}
