import { Ball } from '../../Ball';
import { IObject } from '../../interfaces/IObject';
import { TCollision } from '../../types';
import { goalCollide } from '../../utils/collisions/goalCollide';
import { EType } from '../../utils/config/enums';

export class Goal extends IObject {
  public collide(ball: Ball): TCollision {
    const collision = goalCollide(ball, this._hitBox);
    return { ...collision, type: EType.GOAL };
  }
}
