export class Paddle {

    private width: number;
    private length: number;
    private position: {x: number, z: number};

    constructor (width: number, length: number, position: {x: number, z:number}) {
        this.width = width;
        this.length = length;
        this.position = position;
    }

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
}