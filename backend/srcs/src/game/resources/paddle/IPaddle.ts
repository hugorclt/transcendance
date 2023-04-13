import { IObject } from '../interfaces/IObject';
import { baseCollide } from '../utils/collisions/baseColide';

export class IPaddle extends IObject {
  public collide() {
    baseCollide();
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
