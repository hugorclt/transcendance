import { EType } from 'shared/enum';
import { IObject } from './interfaces/IObject';
import { TCollision } from './types';
import { Vector3 } from './utils/Vector3';
import { Object3D } from 'shared/gameInterfaces';

export class Ball extends IObject {
  private _speed: Vector3;
  private _initialSpeed: Vector3;

  public constructor(
    width: number,
    height: number,
    depth: number,
    position: Vector3,
    speed: Vector3,
    texture?: string,
    type?: EType,
  ) {
    super({
      width: width,
      height: height,
      depth: depth,
      position: position,
      texture: texture,
      type: type,
    });
    this._initialSpeed = speed;
    this._speed = speed;
  }

  public set speed(value: Vector3) {
    this._speed = value;
  }

  public set speedX(value: number) {
    this._speed.x = value;
  }

  public set speedY(value: number) {
    this._speed.y = value;
  }

  public set speedZ(value: number) {
    this._speed.z = value;
  }

  public get speed(): Vector3 {
    return this._speed;
  }

  public get speedX(): number {
    return this._speed.x;
  }

  public get speedY(): number {
    return this._speed.y;
  }

  public get speedZ(): number {
    return this._speed.z;
  }

  public resetSpeed() {
    this._speed = this._initialSpeed;
  }

  public update(deltaTime: number) {
    const position = this.getPosition();
    position.x += this._speed.x * deltaTime;
    position.y += this._speed.y * deltaTime;
    position.z += this._speed.z * deltaTime;
    this.setPosition(position);
  }

  public collide(ball: Ball): TCollision {
    return {
      position: this.getPosition(),
      direction: new Vector3(0, 0, 0),
      type: EType.WALL,
    };
  }

  public exportInfo(): Object3D {
    return({
      type: this.type,
      texture: this.texture,
      width: this.getWidth(),
      height: this.getHeight(),
      depth: this.getDepth(),
      position: {
        x: this._hitBox.position.x,
        y: this._hitBox.position.y,
        z: this._hitBox.position.z,
      },
      velocity: {
        x: this.speedX,
        y: this.speedY,
        z: this.speedZ
      }
    })
  }
}
