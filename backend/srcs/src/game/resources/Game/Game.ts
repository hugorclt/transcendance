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

export class Game {
  private _id: string;
  private _players: Array<Player>;
  private _spectators: Array<string>;
  private _field: Field;
  private _ball: Ball;

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
    //init ball velocity
  }

  detectCollisions() {}

  generateFrame(timer?: number): GameFrameEntity {
    //{
    //get new timestamp
    //calculate delta time
    //reset timestamp
    //execute game loop based on delta time
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
