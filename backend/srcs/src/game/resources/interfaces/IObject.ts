import { EType } from 'shared/enum';
import { Ball } from '../Ball/Ball';
import { TCollision } from '../types';
import { HitBox } from '../utils/HitBox';
import { Vector3 } from '../utils/Vector3';
import { Object3D } from 'shared/gameInterfaces';

export type CreateObjectDto = {
  width: number;
  height: number;
  depth: number;
  position: Vector3;
  texture?: string;
  type?: EType;
};

export abstract class IObject {
  protected texture: string = '';
  protected type: EType = EType.BOX;
  protected _initialPosition: Vector3;
  protected _hitBox: HitBox;

  public constructor(data: CreateObjectDto) {
    this._initialPosition = data.position;
    this._hitBox = new HitBox(
      data.width,
      data.height,
      data.depth,
      data.position,
    );
    if (data.texture) this.texture = data.texture;
    if (data.type) this.type = data.type;
  }

  /* --------------------------------- getters -------------------------------- */
  public get hitBox() {
    return this._hitBox;
  }

  public get initialPosition(): Vector3 {
    return this._initialPosition;
  }

  public getWidth(): number {
    return this._hitBox.width;
  }
  public getHeight() {
    return this._hitBox.height;
  }
  public getDepth() {
    return this._hitBox.depth;
  }
  public getPosition() {
    return this._hitBox.position;
  }

  /* --------------------------------- setters -------------------------------- */
  public setPosition(position: Vector3) {
    this._hitBox.position = position;
  }
  public setWidth(width: number) {
    this._hitBox.width = width;
  }
  public setHeight(height: number) {
    this._hitBox.height = height;
  }
  public setDepth(depth: number) {
    this._hitBox.depth = depth;
  }

  public resetPosition() {
    this._hitBox.position = new Vector3(
      this._initialPosition.x,
      this._initialPosition.y,
      this._initialPosition.z,
    );
  }
  public move(x: number, y: number) {
    this._hitBox.updatePosition(x, y, this._hitBox.position.z);
  }

  public moveX(incrX: number) {
    this._hitBox.updatePosition(
      this._hitBox.position.x + incrX,
      this._hitBox.position.y,
      this._hitBox.position.z,
    );
  }
  public moveY(incrY: number) {
    this._hitBox.updatePosition(
      this._hitBox.position.x,
      this._hitBox.position.y + incrY,
      this._hitBox.position.z,
    );
  }
  public moveZ(incrZ: number) {
    this._hitBox.updatePosition(
      this._hitBox.position.x,
      this._hitBox.position.y,
      this._hitBox.position.z + incrZ,
    );
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
    })
  }

  public exportFrame() : Object3D {
    return({
      type: this.type,
      width: this.getWidth(),
      height: this.getHeight(),
      depth: this.getDepth(),
      position: {
        x: this._hitBox.position.x,
        y: this._hitBox.position.y,
        z: this._hitBox.position.z,
      },
    })
  }

  public abstract collide?(ball: Ball): TCollision;
}
