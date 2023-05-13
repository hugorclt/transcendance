import { EType } from 'shared/enum';
import { Ball } from '../Ball/Ball';
import { TCollision } from '../types';
import { IPaddle } from './IPaddle';
import { CreateObjectDto } from '../interfaces/IObject';
import { basePaddleCollide } from '../utils/collisions/baseColide';

export class PurplePaddle extends IPaddle {
  
  constructor(data: CreateObjectDto) {
    super(data);
    this._superUnleashed = false;
    this._specialCharge = 3;
  }


  public collide(ball: Ball) : TCollision {
    let collision;
    let type;

    if (this._confused){
      this._confused = false;
    }
    if (this._superUnleashed && this._specialCharge == 3){
      this._specialCharge = 0;
      this._superUnleashed = false;
      type = EType.PURPLE_PADDLE;
    }
    else {
      type = EType.PADDLE;
    }
    collision = basePaddleCollide(ball, this._hitBox);
    if (this._specialCharge < 3) {
      this._specialCharge++;
      console.log("special charge : ", this._specialCharge);
    }
    return {...collision, type: type};
  }

  public goSuper() {
    this._superUnleashed = true;
    setTimeout(() => {
      this._superUnleashed = false;
    }, 1000);
  }

  public getSpecialCharge() {
    return this._specialCharge;
  }
}
