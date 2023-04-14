import { Vector3 } from './Vector3';

export class HitBox {
  private _width: number;
  private _height: number;
  private _depth: number;
  private _position: Vector3;
  private _minX: number;
  private _maxX: number;
  private _minY: number;
  private _maxY: number;
  private _minZ: number;
  private _maxZ: number;

  private object: any;

  public constructor(
    width: number,
    height: number,
    depth: number,
    position: Vector3,
  ) {
    this._width = width;
    this._height = height;
    this._depth = depth;
    this._position = position;
    this._updateLimits();
  }

  /* --------------------------------- Getters -------------------------------- */
  public get width(): number {
    return this._width;
  }
  public get height(): number {
    return this._height;
  }
  public get depth(): number {
    return this._depth;
  }
  public get position(): Vector3 {
    return this._position;
  }
  public get minX(): number {
    return this._minX;
  }
  public get maxX(): number {
    return this._maxX;
  }
  public get minY(): number {
    return this._minY;
  }
  public get maxY(): number {
    return this._maxY;
  }
  public get minZ(): number {
    return this._minZ;
  }
  public get maxZ(): number {
    return this._maxZ;
  }
  /* --------------------------------- Setters -------------------------------- */
  public set width(value: number) {
    this._width = value;
    this._updateLimits();
  }
  public set height(value: number) {
    this._height = value;
    this._updateLimits();
  }
  public set depth(value: number) {
    this._depth = value;
    this._updateLimits();
  }
  public set position(value: Vector3) {
    this._position = value;
    this._updateLimits();
  }
  public updatePosition(x: number, y: number, z: number) {
    this._position.x = x;
    this._position.y = y;
    this._position.z = z;
    this._updateLimits();
  }

  private _updateLimits() {
    this._minX = this._position.x - this._width / 2;
    this._maxX = this._position.x + this._width / 2;
    this._minY = this._position.y - this._height / 2;
    this._maxY = this._position.y + this._height / 2;
    this._minZ = this._position.z - this._depth / 2;
    this._maxZ = this._position.z + this._depth / 2;
  }

  public intersect(rhs: HitBox): boolean {
    return (
      this._minX <= rhs._maxX &&
      this._maxX >= rhs._minX &&
      this._minY <= rhs._maxY &&
      this._maxY >= rhs._minY &&
      this._minZ <= rhs._maxZ &&
      this._maxZ >= rhs._minZ
    );
  }
}
