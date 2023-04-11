import { HitBox } from '../utils/HitBox';
import { Vector3 } from '../utils/Vector3';

export abstract class IObject {
  private _initialPosition: Vector3;
  private _hitBox: HitBox;

  public constructor(
    width: number,
    height: number,
    depth: number,
    position: Vector3,
  ) {
    this._initialPosition = position;
    //check for deep copy ok?
    this._hitBox = new HitBox(width, height, depth, position);
  }

  /* --------------------------------- getters -------------------------------- */
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
    //check for deep copy ok?
  }
  public move(x: number, y: number) {
    this._hitBox.updatePosition(x, y, this._hitBox.position.z);
  }

  protected abstract collide?(): void;
}
