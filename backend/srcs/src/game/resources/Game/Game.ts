import { LobbyWithMembersEntity } from 'src/lobbies/entities/lobby.entity';
import { Ball } from '../Ball';
import {
  BallConfig,
  BaseFieldConfig,
  ClassicBallConfig,
  ThreeDBallConfig,
} from '../utils/config/config';
import { Player } from '../player/Player';
import { Field } from '../Field/Field';
import { EField, EPaddle } from '../utils/config/enums';
import { GameFrameEntity } from 'src/game/entities/game-frame.entity';
import { Vector3 } from '../utils/Vector3';
import { IObject } from '../interfaces/IObject';

export class Game {
  private _id: string;
  private _players: Array<Player>;
  private _spectators: Array<string>;
  private _field: Field;
  private _ball: Ball;
  private _lastTimestamp: number = 0;
  private _objects: Array<IObject>;

  public constructor(lobby: LobbyWithMembersEntity) {
    this._players = new Array<Player>();
    this._spectators = new Array<string>();
    this._objects = new Array<IObject>();
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
      this._field.walls.forEach((wall) => {
        this._objects.push(wall);
      });
      this._field.goals.forEach((goal) => {
        this._objects.push(goal);
      });
      this._field.objects.forEach((object) => {
        this._objects.push(object);
      });
      this._players.forEach((player) => {
        this._objects.push(player.paddle);
      });
    }
    if (lobby.mode == 'CHAMPIONS') {
      this._ball = new Ball(
        ThreeDBallConfig.width,
        ThreeDBallConfig.height,
        ThreeDBallConfig.depth,
        ThreeDBallConfig.position,
        ThreeDBallConfig.speed,
      );
      this._field = new Field(EField.CHAMPIONS);
      lobby.members.forEach((member) => {
        this._players.push(
          new Player(
            member.userId,
            member.team,
            EPaddle.CHAMPIONS,
            BaseFieldConfig.depth,
          ),
        );
      });
      this._field.walls.forEach((wall) => {
        this._objects.push(wall);
      });
      this._field.goals.forEach((goal) => {
        this._objects.push(goal);
      });
      this._field.objects.forEach((object) => {
        this._objects.push(object);
      });
      this._players.forEach((player) => {
        this._objects.push(player.paddle);
      });
    }
  }

  /* -------------------------------- main loop ------------------------------- */

  start() {
    //fix first timestamp
    this._lastTimestamp = Date.now();
    //init ball velocity
    // this._ball.speed = new Vector3(1, 0, 4);
  }

  processMovements(deltaTime: number) {
    this._ball.update(deltaTime);
  }

  detectAndApplyCollisions() {
    this._objects.forEach((object) => {
      if (this._ball.hitBox.intersect(object.hitBox)) {
        object.collide(this._ball);
        console.log(`Object class: ${object.constructor.name}`);
        console.log(`Object position: ${JSON.stringify(object.getPosition())}`);
      }
    });
  }

  detectGoal() {}

  gameLoop(deltaTime: number) {
    //update every moving elements based on delta time
    this.processMovements(deltaTime);
    //detect and apply collisions
    this.detectAndApplyCollisions();
    //detect goal
    this.detectGoal();
  }

  generateFrame(): GameFrameEntity {
    const deltaTime = (Date.now() - this._lastTimestamp) / 1000;
    this.gameLoop(deltaTime);
    this._lastTimestamp = Date.now();
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
