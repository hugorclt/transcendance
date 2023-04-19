import { LobbyWithMembersEntity } from 'src/lobbies/entities/lobby.entity';
import { Ball } from '../Ball';
import { Player } from '../player/Player';
import { Field } from '../Field/Field';
import { IObject } from '../interfaces/IObject';
import { TCollision } from '../types';
import { classic } from '../utils/config/maps';
import { space } from '../utils/config/maps';
import { IFrame, IGameInfo } from 'shared/gameInterfaces';

export class Game {
  private _id: string;
  private _players: Array<Player>;
  private _spectators: Array<string>;
  private _field: Field;
  private _ball: Ball;
  private _lastTimestamp: number = 0;
  private _objects: Array<IObject>;
  private _movingObjects: Array<IObject>;
  private _collisions: Array<TCollision>;

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
        //TODO
        //should take paddle choice by user
      );
    });
    this._players.forEach((player) => {
      this._objects.push(player.paddle);
    });
  }

  public constructor(lobby: LobbyWithMembersEntity) {
    this._players = new Array<Player>();
    this._spectators = new Array<string>();
    this._objects = new Array<IObject>();
    this._movingObjects = new Array<IObject>();
    this._collisions = new Array<TCollision>();
    this._id = lobby.id;

    var config;
    if (lobby.mode == 'CLASSIC') {
      config = classic;
    } else if (lobby.mode == 'CHAMPIONS') {
      config = space;
    }
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
        console.log(`Object class: ${object.constructor.name}`);
        console.log(`Object position: ${JSON.stringify(object.getPosition())}`);
      }
    });
  }

  detectGoal() {}

  exportGameInfo() : IGameInfo {
    const field = this._field.exportFieldInfo();
    const ball = this._ball.exportInfo();
    const players = this._players.map((player) => player.exportPlayerInfo());
    return ({field: field, ball: ball, players: players})
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
      players: this._players.map((player) => player.exportPlayerInfo()),
      ball: this._ball.exportFrame(),
      collisions: this.collisions,
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

  /* ---------------------------- helper functions ---------------------------- */
}
