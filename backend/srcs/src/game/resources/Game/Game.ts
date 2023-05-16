import { LobbyWithMembersEntity } from 'src/lobbies/entities/lobby.entity';
import { Ball } from '../Ball/Ball';
import { Player } from '../Player/Player';
import { Field } from '../Field/Field';
import { IObject } from '../interfaces/IObject';
import { TCollision, TScore } from '../types';
import { IFrame, IGameInfo } from 'shared/gameInterfaces';
import { maps } from '../utils/config/maps';
import { EType } from 'shared/enum';
import { Vector3 } from '../utils/Vector3';
import { HitBox } from '../utils/HitBox';

export class Game {
  private _id: string;
  private _players: Array<Player>;
  private _field: Field;
  private _ball: Ball;
  private _lastTimestamp: number = 0;
  private _objects: Array<IObject>;
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

  public getObject() {
    return this._objects;
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
    let sideTeamA = -1;
    let sideTeamB = -1
    lobby.members.forEach((member) => {
      let placement = 0;
      if (lobby.nbPlayers == 4) {
        if (member.team == true) {
          placement = sideTeamA;
          sideTeamA = 1;
        } else {
          placement = sideTeamB;
          sideTeamB = 1;
        }
      }
      this._players.push(
        new Player(member.userId, member.team, member.paddleType, config, placement),
      );
    });
    this._players.forEach((player) => {
      this._objects.push(player.paddle);
    });
  }

  public constructor(lobby: LobbyWithMembersEntity) {
    this._players = new Array<Player>();
    this._objects = new Array<IObject>();
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

  isPointOnLine(point: Vector3, origin: Vector3, directors: Vector3): boolean {
    let eqX, eqY, eqZ;

    eqX = (point.x - origin.x) / directors.x;
    eqY = (point.y - origin.y) / directors.y;
    eqZ = (point.z - origin.z) / directors.z;

    return eqX == eqY && eqX == eqZ;
  }

  detectTunneling(): void {
    const posT = this._ball.getPosition();
    const posTold = this._ball.prevPosition;
    let intersection = undefined;

    //on cree la hitbox de la trajectoire du centre de la balle
    var xMin, yMin, zMin, xMax, yMax, zMax;
    xMin = Math.min(posT.x, posTold.x);
    yMin = Math.min(posT.y, posTold.y);
    zMin = Math.min(posT.z, posTold.z);
    xMax = Math.max(posT.x, posTold.x);
    yMax = Math.max(posT.y, posTold.y);
    zMax = Math.max(posT.z, posTold.z);
    const ballTrajectory = new HitBox(
      xMax - xMin,
      yMax - yMin,
      zMax - zMin,
      new Vector3((xMax + xMin) / 2, (yMax + yMin) / 2, (zMax + zMin) / 2), //A VERIFIER
    );

    var directors = new Vector3(
      posT.x - posTold.x,
      posT.y - posTold.y,
      posT.z - posTold.z,
    );
    //on trouve tous les objets dont la hitbox coincide au moins en un point avec celle de la trajectoire
    this._objects.forEach((object) => {
      if (ballTrajectory.intersect(object.hitBox)) {
        //pour chaque objet avec lesquels la collision est possible, on verifie si contact ou non
        let objectIntersection = object.getFirstIntersection(
          posTold,
          posT,
          directors,
        );
        if (intersection == undefined && objectIntersection != undefined) {
          intersection = objectIntersection;
        } else if (
          objectIntersection != undefined &&
          intersection != undefined &&
          objectIntersection.t < intersection.t
        ) {
          intersection = objectIntersection;
        }
      }
    });
    //On replace la balle au point d'intersection le plus proche de sa position precedente
    if (intersection != undefined) {
      this._ball.setPosition(
        new Vector3(intersection.p.x, intersection.p.y, intersection.p.z),
      );
    }
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

  detectAndApplySuperPowers() {
    this._collisions.forEach((collision) => {
      //PURPLE PADDLE
      if (collision.type == EType.PURPLE_PADDLE){
        if (collision.direction.z > 0){
          this._players.forEach((player) => {
            if (player.team == true){
              player.getConfused();
            }
          })
        }
        else {
          this._players.forEach((player) => {
            if (player.team == false){
              player.getConfused();
            }
          })
        }
      }
    })
  }

  exportGameInfo(): IGameInfo {
    const field = this._field.exportFieldInfo();
    const ball = this._ball.exportInfo();
    const players = this._players.map((player) => player.exportPlayerInfo());
    return { mode: this._mode, field: field, ball: ball, players: players };
  }

  gameLoop(deltaTime: number) {
    this._collisions.length = 0;
    this.processMovements(deltaTime);
    this.detectTunneling();
    this.detectAndApplyCollisions();
    if (this._mode == "CHAMPIONS")
      this.detectAndApplySuperPowers();
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
