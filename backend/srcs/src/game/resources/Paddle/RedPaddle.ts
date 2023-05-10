import { EType } from 'shared/enum';
import { Ball } from '../Ball/Ball';
import { TCollision } from '../types';
import { baseCollide, basePaddleCollide } from '../utils/collisions/baseColide';
import { IPaddle } from './IPaddle';
import { CreateObjectDto } from '../interfaces/IObject';

export class RedPaddle extends IPaddle {
  
  private specialCharge: number;
  private superUnleashed: boolean;

  constructor(data: CreateObjectDto) {
    super(data);
    this.superUnleashed = true;
    this.specialCharge = 0;
  }


  public collide(ball: Ball) : TCollision {
    let collision;
    if (this.superUnleashed && this.specialCharge == 3){
      this.specialCharge = 0;
      this.superUnleashed = false;
    }
    else {
      collision = basePaddleCollide(ball, this._hitBox);
      if (this.specialCharge < 3) {
        this.specialCharge++;
      }
    }
    return {...collision, type: EType.RED_PADDLE};
  }
  public goSuper() {
    this.superUnleashed = true;
    console.log("super on");
    setTimeout(() => {
      this.superUnleashed = false;
      console.log("super off");
    }, 1000);
  }
  public moveLeft() {
    this.moveX(-0.2);
  }
  public moveRight() {
    this.moveX(0.2);
  }
  public moveUp() {
    this.moveY(0.2);
  }
  public moveDown() {
    this.moveY(-0.2);
  }
  public getSpecialCharge() {
    return this.specialCharge;
  }
}   
