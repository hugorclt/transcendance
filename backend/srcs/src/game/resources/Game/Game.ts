import { LobbyWithMembersEntity } from 'src/lobbies/entities/lobby.entity';
import { Ball } from '../Ball';
import {
  BallConfig,
  BaseFieldConfig,
  ClassicBallConfig,
} from '../utils/config/config';
import { Player } from '../player/Player';
import { Field } from '../Field/Field';
import { EField, EPaddle } from '../utils/config/enums';
import { GameFrameEntity } from 'src/game/entities/game-frame.entity';
import { Vector3 } from '../utils/Vector3';

export class Game {
  private _id: string;
  private _players: Array<Player>;
  private _spectators: Array<string>;
  private _field: Field;
  private _ball: Ball;
  private _lastTimestamp: number = 0;

  public constructor(lobby: LobbyWithMembersEntity) {
    this._players = new Array<Player>();
    this._spectators = new Array<string>();
    this._id = lobby.id;
    if (lobby.mode == 'CLASSIC') {
      this._ball = new Ball(
        ClassicBallConfig.width,
        ClassicBallConfig.height,
        ClassicBallConfig.depth,
        ClassicBallConfig.position,
        ClassicBallConfig.speed,
      );
      this._field = new Field(EField.CLASSIC);
      lobby.members.forEach((member) => {
        this._players.push(
          new Player(
            member.userId,
            member.team,
            EPaddle.CLASSIC,
            BaseFieldConfig.depth,
          ),
        );
      });
    }
  }

  /* -------------------------------- main loop ------------------------------- */

  start() {
    //fix first timestamp
    this._lastTimestamp = Date.now();
    //init ball velocity
    this._ball.speed = new Vector3(0, 0, 1);
  }

  processMovements(deltaTime: number) {
    this._ball.update(deltaTime);
  }

  detectAndApplyCollisions() {}

  gameLoop(deltaTime: number) {
    //update every moving elements based on delta time
    this.processMovements(deltaTime);
    //detect and apply collisions
    this.detectAndApplyCollisions();
  }

  generateFrame(): GameFrameEntity {
    //calculate delta time im milliseconds
    const deltaTime = (Date.now() - this._lastTimestamp) / 1000;
    console.log('time passed since last loop: ', deltaTime);
    //execute game loop based on delta time
    this.gameLoop(deltaTime);
    //get new timestamp
    this._lastTimestamp = Date.now();
    //}
    return {
      players: this.players,
      ball: this.ball,
    };
  }

  /* --------------------------------- getter --------------------------------- */
  public get players() {
    return this._players;
  }
  public get field() {
    return this._field;
  }
  public get ball() {
    return this._ball;
  }

  /* ---------------------------- helper functions ---------------------------- */
}
