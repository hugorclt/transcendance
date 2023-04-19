import { EType } from 'shared/enum';
import { Ball } from '../../Ball/Ball';
import { IObject } from '../../interfaces/IObject';
import { TCollision } from '../../types';
import { goalCollide } from '../../utils/collisions/goalCollide';

export class Goal extends IObject {
  public collide(ball: Ball): TCollision {
    const collision = goalCollide(ball, this._hitBox);
    return { ...collision, type: EType.GOAL };
  }
}
