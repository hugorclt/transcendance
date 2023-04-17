import { Ball } from '../../Ball';
import { IObject } from '../../interfaces/IObject';
import { baseCollide } from '../../utils/collisions/baseColide';

export class Wall extends IObject {
  public collide(ball: Ball) {
    baseCollide(ball, this._hitBox);
  }
}
