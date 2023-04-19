import { EPaddle } from '@prisma/client';
import { BasePaddle } from '../Paddle/BasePaddle';
import { IPaddle } from '../Paddle/IPaddle';
import { Vector3 } from '../utils/Vector3';
import { IPlayer } from 'shared/gameInterfaces';
import { RedPaddle } from '../Paddle/RedPaddle';
import { BluePaddle } from '../Paddle/BluePaddle';
import { OrangePaddle } from '../Paddle/OrangePaddle';
import { PurplePaddle } from '../Paddle/PurplePaddle';
import { GreenPaddle } from '../Paddle/GreenPaddle';
import { EType } from 'shared/enum';
import { ClassicPaddle } from '../Paddle/ClassicPaddle';

export class Player {
  private _paddle: IPaddle;
  private _id: string;
  private _team: boolean;
  private _ready: boolean;

  public constructor(
    id: string,
    team: boolean,
    paddleType: EPaddle,
    config: any,
  ) {
    this._id = id;
    this._team = team;
    this._ready = false;
    const paddleConfig = {
      ...config.paddle,
      position: new Vector3(
        0,
        0,
        team ? config.depth / 2 : -(config.depth / 2),
      ),
    }
    switch (paddleType) {
      case EPaddle.CLASSIC:
        this._paddle = new ClassicPaddle({...paddleConfig, type:EType.CLASSIC_PADDLE});
        break;
      case EPaddle.BASIC:
        this._paddle = new BasePaddle({...paddleConfig, type:EType.BASIC_PADDLE});
        break;
      case EPaddle.RED:
        this._paddle = new RedPaddle({...paddleConfig, type:EType.RED_PADDLE});
        break;
      case EPaddle.BLUE:
        this._paddle = new BluePaddle({...paddleConfig, type:EType.BLUE_PADDLE});
        break;
      case EPaddle.ORANGE:
        this._paddle = new OrangePaddle({...paddleConfig, type:EType.ORANGE_PADDLE});
        break;
      case EPaddle.PURPLE:
        this._paddle = new PurplePaddle({...paddleConfig, type:EType.PURPLE_PADDLE});
        break;
      case EPaddle.GREEN:
        this._paddle = new GreenPaddle({...paddleConfig, type:EType.GREEN_PADDLE});
        break;
    }
  }

  public set ready(ready: boolean) {
    this._ready = ready;
  }
  public get ready(): boolean {
    return this._ready;
  }
  public get id(): string {
    return this._id;
  }

  public get team(): boolean {
    return this._team;
  }

  public get paddle(): IPaddle {
    return this._paddle;
  }

  public exportPlayerInfo() : IPlayer {
    return ({
      id: this._id,
      team: this._team,
      paddle: this._paddle.exportInfo()
    })
  }

  public exportPlayerFrame() : IPlayer{
    return ({
      id: this._id,
      team: this._team,
      paddle: this._paddle.exportFrame(),
    })
  }
}
