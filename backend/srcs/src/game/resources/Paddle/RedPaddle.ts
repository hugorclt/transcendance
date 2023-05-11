import { EType } from 'shared/enum';
import { Ball } from '../Ball/Ball';
import { TCollision } from '../types';
import { baseCollide, basePaddleCollide } from '../utils/collisions/baseColide';
import { IPaddle } from './IPaddle';
import { CreateObjectDto } from '../interfaces/IObject';
import { superCollide } from '../utils/collisions/superCollide';

export class RedPaddle extends IPaddle {

  constructor(data: CreateObjectDto) {
    super(data);
    this.superUnleashed = false;
    this.specialCharge = 3;
  }


  public collide(ball: Ball) : TCollision {
    let collision;
    if (this.superUnleashed && this.specialCharge == 3){
      this.specialCharge = 0;
      this.superUnleashed = false;
      superCollide(ball, this._hitBox);
    }
    else {
      collision = basePaddleCollide(ball, this._hitBox);
      if (this.specialCharge < 3) {
        this.specialCharge++;
        console.log("special charge : ", this.specialCharge);
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
