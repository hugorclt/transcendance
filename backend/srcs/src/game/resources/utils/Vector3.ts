export class Vector3 {
  private _x: number;
  private _y: number;
  private _z: number;

  constructor(x: number, y: number, z: number) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  public get x(): number {
    return this._x;
  }
  public get y(): number {
    return this._y;
  }
  public get z(): number {
    return this._z;
  }

  public set x(x: number) {
    this._x = x;
  }
  public set y(y: number) {
    this._y = y;
  }
  public set z(z: number) {
    this._z = z;
  }

  public setPosition(x: number, y: number, z: number) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  public distanceTo(other: Vector3): number {
    const a = other.x - this.x;
    const b = other.y - this.y;
    const c = other.z - this.z;

    return Math.sqrt(a * a + b * b + c * c);
  }
}
