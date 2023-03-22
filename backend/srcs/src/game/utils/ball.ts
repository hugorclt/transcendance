import { Paddle } from "./paddle";
import { Pitch } from "./pitch";

export class Ball {
  private x: number;
  private z: number;
  private vx: number;
  private vz: number;
  private radius: number;
  private mass: number;

  constructor(x: number, z: number, vx: number, vz: number, radius: number, mass: number) {
    this.x = x;
    this.z = z;
    this.vx = vx;
    this.vz = vz;
    this.radius = radius;
    this.mass = mass;
  }

  update(dt: number) {
    // Update the position of the ball based on its velocity and the elapsed time
    this.x += this.vx * dt;
    this.z += this.vz * dt;
  }

  /*================================ Getter // Setter ==============================*/

  getX() {
    return this.x;
  }

  setX(x: number) {
    this.x = x;
  }

  getZ() {
    return this.z;
  }

  setZ(z: number) {
    this.z = z;
  }

  getVX() {
    return this.vx;
  }

  setVX(vx: number) {
    this.vx = vx;
  }

  getVZ() {
    return this.vz;
  }

  setVZ(vz: number) {
    this.vz = vz;
  }

  getRadius() {
    return this.radius;
  }

  setRadius(radius: number) {
    this.radius = radius;
  }

  getMass() {
    return this.mass;
  }

  setMass(mass: number) {
    this.mass = mass;
  }

  /*================================ BALL MOVE ==============================*/

  collideWithPaddle(paddle: Paddle) {
    // Compute the impulse of the collision
    const dx = this.x - paddle.getX();
    const dz = this.z - paddle.getZ();
    const dist = Math.sqrt(dx * dx + dz * dz);
    const normalX = dx / dist;
    const normalZ = dz / dist;
    const speed = Math.sqrt(this.vx * this.vx + this.vz * this.vz);
    const dot = this.vx * normalX + this.vz * normalZ;
    const angle = Math.atan2(normalZ, normalX);
    const elasticity = 0.8;
    const impulse = (2 * dot * this.mass * paddle.getMass()) / (this.mass + paddle.getMass());

    // Update the velocity of the ball based on the impulse of the collision
    this.vx = elasticity * speed * Math.cos(angle) + impulse * normalX / this.mass;
    this.vz = elasticity * speed * Math.sin(angle) + impulse * normalZ / this.mass;
  }

  collideWithPitch(pitch: Pitch) {
    const radius = this.radius;
    const wallThickness = pitch.getWallThickness();

    // Check for collision with left wall
    if (this.x - radius < pitch.getLeftWallPosition()) {
      this.x = pitch.getLeftWallPosition() + radius;
      this.vx = -this.vx;
    }

    // Check for collision with right wall
    if (this.x + radius > pitch.getRightWallPosition()) {
      this.x = pitch.getRightWallPosition() - radius;
      this.vx = -this.vx;
    }
  }


  respawn(x: number, z: number, vx: number, vy: number, radius: number, mass: number) {
    this.x = x;
    // this.y = y;
    this.z = z;
    this.vx = vx;
    this.vz = vy;
    this.radius = radius;
    this.mass = mass;
  }
}