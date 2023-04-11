import { IObject } from '../interfaces/IObject';
import { BasePaddle } from '../paddle/BasePaddle';
import { Vector3 } from '../utils/Vector3';
import { BasePaddleConfig } from '../utils/config/config';
import { EPaddle } from '../utils/config/enums';

export class Player {
  private _paddle: IObject;
  private _id: string;
  private _team: boolean;

  public constructor(
    id: string,
    team: boolean,
    paddleType: EPaddle,
    fieldDepth: number,
  ) {
    this._id = id;
    this._team = team;
    switch (paddleType) {
      case EPaddle.BASIC:
        //CLEANER SOLUTION WITH DEFAULT FALLBACK TO BASE CONFIG
        this._paddle = new BasePaddle(
          BasePaddleConfig.width,
          BasePaddleConfig.height,
          BasePaddleConfig.depth,
          new Vector3(0, 0, team ? fieldDepth / 2 : -(fieldDepth / 2)),
        );
        break;
    }
  }
}
