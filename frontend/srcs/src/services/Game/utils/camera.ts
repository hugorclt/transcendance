// toDO : LIMIT CAMERA MOVE. MAYBE FRONT SIDE AS CAMERA DOES NOT ALLOW TO CHEAT ?

export class Camera {
  private position: { x: number, y: number, z: number };
  private pitch: number; // Angle around x-axis
  private yaw: number; // Angle around y-axis

  constructor(x = 0, y = 0, z = 0, pitch = 0, yaw = 0) {
    this.position = { x, y, z };
    this.pitch = pitch;
    this.yaw = yaw;
  }

  setPosition(x: number, y: number, z: number) {
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
  }

  setOrientation(pitch: number, yaw: number) {
    this.pitch = pitch;
    this.yaw = yaw;
  }

  getDirection(): [number, number, number] {
    const x = Math.cos(this.yaw) * Math.cos(this.pitch);
    const y = Math.sin(this.pitch);
    const z = Math.sin(this.yaw) * Math.cos(this.pitch);
    return [x, y, z];
  }
  
  moveForward(distance: number) {
    const [x, y, z] = this.getDirection();
    this.position.x += x * distance;
    this.position.y += y * distance;
    this.position.z += z * distance;
  }
}
