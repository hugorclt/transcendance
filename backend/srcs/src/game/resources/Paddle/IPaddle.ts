import { EType } from 'shared/enum';
import { Ball } from '../Ball/Ball';
import { IObject } from '../interfaces/IObject';
import { TCollision } from '../types';
import { basePaddleCollide } from '../utils/collisions/baseColide';

export abstract class IPaddle extends IObject {
  protected _specialCharge: number;
  protected _superUnleashed: boolean;
  protected _confused: boolean = false;

  public collide(ball: Ball): TCollision {
    if (this._confused){
      this._confused = false;
    }
    const collision = basePaddleCollide(ball, this._hitBox);
    return { ...collision, type: EType.PADDLE };
  }

  public getCharge() {
    return this._specialCharge;
  }

  public set confused(b: boolean) {
    this._confused = true;
  }
  public goSuper() {}

  public moveLeft() {
    this._confused ? this.moveX(0.2) : this.moveX(-0.2);
  }
  public moveRight() {
    this._confused ? this.moveX(-0.2) : this.moveX(0.2);
  }
  public moveUp() {
    this._confused ? this.moveY(-0.2) : this.moveY(0.2);
  }
  public moveDown() {
    this._confused ? this.moveY(0.2) : this.moveY(-0.2);
  }
}
