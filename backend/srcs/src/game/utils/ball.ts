export class Ball {
    private x: number;
    private y: number;
    private vx: number;
    private vy: number;
    private radius: number;
  
    constructor(x: number, y: number, vx: number, vy: number, radius: number) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.radius = radius;
    }
  
    update(dt: number) {
      // Update the position of the ball based on its velocity and the elapsed time
      this.x += this.vx * dt;
      this.y += this.vy * dt;
    }
  
  
/*================================ Getter // Setter ==============================*/

    getX() {
      return this.x;
    }
  
    setX(x: number) {
      this.x = x;
    }
  
    getY() {
      return this.y;
    }
  
    setY(y: number) {
      this.y = y;
    }
  
    getVX() {
      return this.vx;
    }
  
    setVX(vx: number) {
      this.vx = vx;
    }
  
    getVY() {
      return this.vy;
    }
  
    setVY(vy: number) {
      this.vy = vy;
    }
  
    getRadius() {
      return this.radius;
    }
  
    setRadius(radius: number) {
      this.radius = radius;
    }


    /*================================ COMPUTATION ==============================*/
    
    

  bounce(position: {x: number, y: number}, velocity: {x: number, y: number}, angle: number) {
      // Compute the normal and tangent vectors of the surface being bounced off
      const surfaceNormal = {x: Math.cos(angle), y: -Math.sin(angle)};
      const surfaceTangent = {x: -Math.sin(angle), y: -Math.cos(angle)};
    
      // Compute the dot product of the velocity vector with the surface normal and tangent
      const vn = velocity.x * surfaceNormal.x + velocity.y * surfaceNormal.y;
      const vt = velocity.x * surfaceTangent.x + velocity.y * surfaceTangent.y;
    
      // Reflect the velocity vector across the surface normal and add the surface tangent component
      const newVelocity = {
        x: -vn * surfaceNormal.x + vt * surfaceTangent.x,
        y: -vn * surfaceNormal.y + vt * surfaceTangent.y
      };
    
      // Update the position and velocity of the ball
      position.x += newVelocity.x;
      position.y += newVelocity.y;
      velocity.x = newVelocity.x;
      velocity.y = newVelocity.y;
  }
}