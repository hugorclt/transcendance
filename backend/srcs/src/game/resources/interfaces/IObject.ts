import { Ball } from '../Ball';
import { HitBox } from '../utils/HitBox';
import { Vector3 } from '../utils/Vector3';

export abstract class IObject {
  protected _initialPosition: Vector3;
  protected _hitBox: HitBox;

  public constructor(
    width: number,
    height: number,
    depth: number,
    position: Vector3,
  ) {
    this._initialPosition = position;
    this._hitBox = new HitBox(width, height, depth, position);
  }

  /* --------------------------------- getters -------------------------------- */
  public get hitBox() {
    return this._hitBox;
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

  public resetPosition(position: Vector3) {
    this._hitBox.position = this._initialPosition;
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

  public abstract collide?(ball: Ball): void;
}
