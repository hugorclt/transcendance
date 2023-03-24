export class Ball {

  private position: {x: number, y: number, z: number};
  private radius: number;
  private velocity: {x: number, z: number};
  private stopped: boolean;
  
  constructor (position: {x: number, y: number, z: number}, radius: number, velocity: {x: number, z: number}, stopped: boolean) {
    this.position = position;
    this.radius = radius;
    this.velocity = velocity;
    this.stopped = false;
  }

  getVelocity() {
    return this.velocity;
  }

  setVelocity(velocity: {x: number, z: number}) {
    this.velocity = velocity;
  }

  setVelocityX(x: number) {
    this.velocity.x = x;
  }

  setVelocityZ(z: number) {
    this.velocity.z = z;
  }

  getStopped() {
    return this.stopped;
  }

  setStopped(stopped: boolean) {
    this.stopped = stopped;
  }

  getPosition() {
    return this.position;
  }

  setPositionX(x: number) {
    this.position.x = x;
  }

  setPositionY(y: number) {
    this.position.y = y;
  }

  setPositionZ(z: number) {
    this.position.z = z;
  }

  getRadius() {
    return this.radius;
  }
}