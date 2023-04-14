import { Ball } from '../../Ball';
import { IObject } from '../../interfaces/IObject';
import { goalCollide } from '../../utils/collisions/goalCollide';

export class Goal extends IObject {
  public collide(ball: Ball) {
    goalCollide(ball, this._hitBox);
  }
}
