import { IObject } from '../interfaces/IObject';
import { TCollision } from '../types';
import { Vector3 } from '../utils/Vector3';
import { EType } from '../utils/config/enums';

export class RedPaddle extends IObject {
  public collide(): TCollision {
    return {
      position: this.getPosition(),
      direction: new Vector3(0, 0, 0),
      type: EType.WALL,
    };
  }
}
