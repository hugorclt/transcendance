import { SpecialShot } from "./specialShot";

export class Paddle {

    private width: number;
    private length: number;
    private position: {x: number, z: number};

    private specialShot: SpecialShot;
    private isSpecialShot: boolean;

    constructor (width: number, length: number, position: {x: number, z:number}, specialShot: SpecialShot) {
        this.width = width;
        this.length = length;
        this.position = position;
        this.specialShot = specialShot;
        this.isSpecialShot = false;
    }

    /*======= getter and setter =======*/

    getWidth() {
        return this.width;
    }

    getLength() {
        return this.length;
    }

    getPosition() {
        return this.position;
    }

    setPosition(x: number, z: number) {
        this.position.x = x;
        this.position.z = z;
    }

    setWidth(width: number) {
        this.width = width;
    }

    setLength(length: number) {
        this.length= length;
    }

    moveLeft() {
        this.position.x -= 0.2;
    }

    moveRight() {
        this.position.x += 0.2;
    }

    setPositionX(x: number) {
        this.position.x = x;
    }

    setPositionZ(z: number) {
        this.position.z = z;
    }

    getSpecialShot() {
        return this.specialShot;
    }

    getIsSpecialShot() {
        return this.isSpecialShot;
    }

    /*======= special shot =======*/
    

    trigger() {
        if (this.isSpecialShot === false) {
          this.isSpecialShot = true;
          setTimeout(() => {
            this.isSpecialShot = false;
          }, 1000);
        }
      }
}