export class Paddle {
    private x: number;
    private y: number;
    private z: number;
    private width: number;
    private height: number;
    private depth: number;
    private mass:number;
  
    constructor(x: number, y: number, z: number, width: number, height: number, depth: number, mass: number) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.width = width;
      this.height = height;
      this.depth = depth;
      this.mass = mass;
    }
  
    move(x: number) {
      this.x = x;
    }
  
    getX(): number {
      return this.x;
    }

    setX(x: number) {
        this.x = x
    }

    getY(): number {
      return this.y;
    }
  
    setY(y: number) {
        this.y = y;
    }

    getZ(): number {
      return this.z;
    }

    setZ(z: number) {
        this.z = z;
    }
  
    getWidth(): number {
      return this.width;
    }
  
    setWidth(width: number) {
        this.width = width;
    }

    getHeight(): number {
      return this.height;
    }

    setHeight(height: number) {
        this.height = height;
    }

    getDepth(): number {
      return this.depth;
    }

    setDepth(depth: number) {
        this.depth = depth;
    }

    getMass(): number {
      return this.mass;
    }

    setMass(mass: number) {
      this.mass = mass;
    }
  };
  