import { LobbyWithMembersEntity } from 'src/lobbies/entities/lobby.entity';
import { Ball } from '../Ball';
import { IObject } from '../interfaces/IObject';
import { BallConfig, BaseFieldConfig } from '../utils/config/config';
import { Wall } from '../wall/Wall';
import { Vector3 } from '../utils/Vector3';
import { Player } from '../player/Player';
import { EPaddle } from '../utils/types';

export class Game {
  private _id: string;
  private _players: Set<Player>;
  // private field: IObject;  => define different pre designed fields
  private _walls: Set<Wall>;
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
    this._createBasicWalls();
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

  /* ---------------------------- helper functions ---------------------------- */
  private _createBasicWalls() {
    //vertical wall left
    this._walls.add(
      new Wall(
        BaseFieldConfig.VerticalWallConfig.width,
        BaseFieldConfig.VerticalWallConfig.height,
        BaseFieldConfig.VerticalWallConfig.depth,
        new Vector3(-(BaseFieldConfig.width / 2), 0, 0),
      ),
    );
    //vertical wall right
    this._walls.add(
      new Wall(
        BaseFieldConfig.VerticalWallConfig.width,
        BaseFieldConfig.VerticalWallConfig.height,
        BaseFieldConfig.VerticalWallConfig.depth,
        new Vector3(BaseFieldConfig.width / 2, 0, 0),
      ),
    );
    //floor
    this._walls.add(
      new Wall(
        BaseFieldConfig.HorizontalWallConfig.width,
        BaseFieldConfig.HorizontalWallConfig.height,
        BaseFieldConfig.HorizontalWallConfig.depth,
        new Vector3(0, -(BaseFieldConfig.height / 2), 0),
      ),
    );
    //ceiling
    this._walls.add(
      new Wall(
        BaseFieldConfig.HorizontalWallConfig.width,
        BaseFieldConfig.HorizontalWallConfig.height,
        BaseFieldConfig.HorizontalWallConfig.depth,
        new Vector3(0, BaseFieldConfig.height / 2, 0),
      ),
    );
  }
}
