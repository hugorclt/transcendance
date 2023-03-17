export class Pitch {
  private width: number;
  private height: number;
  private depth: number;
  private wallThickness: number;

  constructor(width: number, height: number, depth: number, wallThickness: number) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.wallThickness = wallThickness;
  }

  update() : void {
    // map modification ?
  }

  getWidth(): number {
    return this.width;
  }

  setWidth(width: number): void {
    this.width = width;
  }

  getHeight(): number {
    return this.height;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  getDepth(): number {
    return this.depth;
  }

  setDepth(depth: number): void {
    this.depth = depth;
  }

  getWallThickness(): number {
    return this.wallThickness;
  }

  setWallThickness(wallThickness: number): void {
    this.wallThickness = wallThickness;
  }

  getLeftWallPosition(): number {
    return -this.width / 2 + this.wallThickness / 2;
  }

  getRightWallPosition(): number {
    return this.width / 2 - this.wallThickness / 2;
  }
}
