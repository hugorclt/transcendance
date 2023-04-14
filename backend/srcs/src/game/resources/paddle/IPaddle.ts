import { Ball } from '../Ball';
import { IObject } from '../interfaces/IObject';
import { baseCollide } from '../utils/collisions/baseColide';

export abstract class IPaddle extends IObject {
  public collide(ball: Ball) {
    baseCollide(ball, this._hitBox);
  }

  public moveLeft() {
    this.moveX(-0.2); //TODO   ==> config
  }
  public moveRight() {
    this.moveX(0.2); //TODO   ==> config
  }
  public moveUp() {
    this.moveY(0.2); //TODO   ==> config
  }
  public moveDown() {
    this.moveY(-0.2); //TODO   ==> config
  }
}
