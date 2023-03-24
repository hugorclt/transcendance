export class Field {

  private width: number;
  private length: number;

  constructor(width: number, length: number) {
    this.width = width;
    this.length = length;
  }

  getWidth() {
    return this.width;
  }

  getLength() {
    return this.length;
  }

  setWidth(width: number) {
    this.width = width;
  }

  setLength(length: number) {
    this.length = length;
  }
}
