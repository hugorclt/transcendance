import { Vector3 } from '../Vector3';

export class IPaddle {
  private _width: number;
  private _height: number;
  private _depth: number;
  private _position: Vector3;

  public constructor(init?: Partial<IPaddle>) {
    Object.assign(this, init);
  }

  /* --------------------------------- getters -------------------------------- */
  public getWidth() {
    return this._width;
  }
  public getHeight() {
    return this._height;
  }
  public getDepth() {
    return this._depth;
  }
  public getPosition() {
    return this._position;
  }

  /* --------------------------------- setters -------------------------------- */
  public setPosition(position: Vector3) {
    this._position = position;
  }

  public setWidth(width: number) {
    this._width = width;
  }

  public setHeight(height: number) {
    this._height = height;
  }

  protected move?(position: Vector3): void;
}
