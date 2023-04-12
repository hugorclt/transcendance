import { LobbyWithMembersEntity } from 'src/lobbies/entities/lobby.entity';
import { Ball } from '../Ball';
import { BallConfig, BaseFieldConfig } from '../utils/config/config';
import { Player } from '../player/Player';
import { Field } from '../Field/Field';
import { EField, EPaddle } from '../utils/config/enums';

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
    this._ball = new Ball(
      BallConfig.width,
      BallConfig.height,
      BallConfig.depth,
      BallConfig.position,
      BallConfig.speed,
    );
    this._field = new Field(EField.BASIC);
    lobby.members.forEach((member) => {
      this._players.push(
        new Player(
          member.userId,
          member.team,
          EPaddle.BASIC,
          BaseFieldConfig.depth,
        ),
      );
    });
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
