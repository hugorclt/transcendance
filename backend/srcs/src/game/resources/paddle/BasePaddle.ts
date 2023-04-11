import { IObject } from '../interfaces/IObject';
import { baseCollide } from '../utils/collisions/baseColide';

export class BasePaddle extends IObject {
  public collide() {
    baseCollide();
  }
}
