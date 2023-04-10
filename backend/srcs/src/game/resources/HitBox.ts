import { Vector3 } from './Vector3';

export class HitBox {
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
    this._minX = position.x - width / 2;
    this._maxX = position.x + width / 2;
    this._minY = position.y - height / 2;
    this._maxY = position.y + height / 2;
    this._minZ = position.z - depth / 2;
    this._maxZ = position.z + depth / 2;
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
