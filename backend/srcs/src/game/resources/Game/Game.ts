import { LobbyWithMembersEntity } from 'src/lobbies/entities/lobby.entity';
import { Ball } from '../Ball';
import { IObject } from '../interfaces/IObject';
import { BallConfig, BaseFieldConfig } from '../utils/config/config';
import { Wall } from '../Field/wall/Wall';
import { Vector3 } from '../utils/Vector3';
import { Player } from '../player/Player';
import { EField, EPaddle } from '../utils/types';
import { Field } from '../Field/Field';

export class Game {
  private _id: string;
  private _players: Set<Player>;
  private _field: Field;
  private _ball: Ball;

  public constructor(lobby: LobbyWithMembersEntity) {
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
      this._players.add(
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
