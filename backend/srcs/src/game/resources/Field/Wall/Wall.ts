import { EType } from 'shared/enum';
import { Ball } from '../../Ball';
import { IObject } from '../../interfaces/IObject';
import { TCollision } from '../../types';
import { baseCollide } from '../../utils/collisions/baseColide';

export class Wall extends IObject {
  public collide(ball: Ball): TCollision {
    const collision = baseCollide(ball, this._hitBox);
    return { ...collision, type: EType.WALL };
  }
}
