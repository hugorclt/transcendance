import { LobbyWithMembersEntity } from 'src/lobbies/entities/lobby.entity';
import { Ball } from '../Ball/Ball';
import { Player } from '../Player/Player';
import { Field } from '../Field/Field';
import { IObject } from '../interfaces/IObject';
import { TCollision, TScore } from '../types';
import { IFrame, IGameInfo } from 'shared/gameInterfaces';
import { maps } from '../utils/config/maps';
import { goalCollide } from '../utils/collisions/goalCollide';
import { EType } from 'shared/enum';

export class Game {
  private _id: string;
  private _players: Array<Player>;
  private _field: Field;
  private _ball: Ball;
  private _lastTimestamp: number = 0;
  private _objects: Array<IObject>;
  private _movingObjects: Array<IObject>;
  private _collisions: Array<TCollision>;
  private _score: TScore;
  private _mode: string;

  private _init_ball(config: any) {
    const ball = config.ball;
    this._ball = new Ball(
      ball.width,
      ball.height,
      ball.depth,
      ball.position,
      ball.velocity,
      ball.texture,
      ball.type,
    );
  }

  private _init_field(config: any) {
    this._field = new Field(config);
    this._field.walls.forEach((wall) => {
      this._objects.push(wall);
    });
    this._field.goals.forEach((goal) => {
      this._objects.push(goal);
    });
    this._field.objects.forEach((object) => {
      this._objects.push(object);
    });
  }

  private _init_players(config: any, lobby: LobbyWithMembersEntity) {
    lobby.members.forEach((member) => {
      this._players.push(
        new Player(member.userId, member.team, member.paddleType, config),
      );
    });
    this._players.forEach((player) => {
      this._objects.push(player.paddle);
    });
  }

  public constructor(lobby: LobbyWithMembersEntity) {
    this._players = new Array<Player>();
    this._objects = new Array<IObject>();
    this._movingObjects = new Array<IObject>();
    this._collisions = new Array<TCollision>();
    this._score = {
      team1: 0,
      team2: 0,
    };
    this._id = lobby.id;
    this._mode = lobby.mode;
    const config = maps.find((map) => map.name == lobby.map);
    this._init_ball(config);
    this._init_field(config);
    this._init_players(config, lobby);
  }

  /* -------------------------------- main loop ------------------------------- */

  start() {
    this._lastTimestamp = Date.now();
  }

  processMovements(deltaTime: number) {
    this._ball.update(deltaTime);
  }

  detectAndApplyCollisions() {
    this._objects.forEach((object) => {
      if (this._ball.hitBox.intersect(object.hitBox)) {
        this._collisions.push(object.collide(this._ball));
      }
    });
  }

  detectGoal() {
    const goal = this._collisions.find(
      (collision) => collision.type == EType.GOAL,
    );
    if (goal) {
      if (goal.direction.z < 0) {
        this._score.team1 += 1;
      } else {
        this._score.team2 += 1;
      }
    }
  }

  exportGameInfo(): IGameInfo {
    const field = this._field.exportFieldInfo();
    const ball = this._ball.exportInfo();
    const players = this._players.map((player) => player.exportPlayerInfo());
    return { field: field, ball: ball, players: players };
  }

  gameLoop(deltaTime: number) {
    this._collisions.length = 0;
    this.processMovements(deltaTime);
    this.detectAndApplyCollisions();
    this.detectGoal();
  }

  generateFrame(): IFrame {
    const deltaTime = (Date.now() - this._lastTimestamp) / 1000;
    this.gameLoop(deltaTime);
    this._lastTimestamp = Date.now();
    return {
      timestamp: this._lastTimestamp,
      players: this._players.map((player) => player.exportPlayerFrame()),
      ball: this._ball.exportFrame(),
      collisions: this.collisions,
      score: this._score,
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
  public get collisions() {
    return this._collisions;
  }
  public get mode() {
    return this._mode;
  }
}
