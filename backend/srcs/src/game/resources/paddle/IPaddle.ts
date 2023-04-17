import { Ball } from '../Ball';
import { IObject } from '../interfaces/IObject';
import { TCollision } from '../types';
import { baseCollide } from '../utils/collisions/baseColide';
import { EType } from '../utils/config/enums';

export abstract class IPaddle extends IObject {
  public collide(ball: Ball): TCollision {
    const collision = baseCollide(ball, this._hitBox);
    return { ...collision, type: EType.PADDLE };
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
