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

    moveLeft() {
        this.position.x -= 1
    }

    moveRight() {
        this.position.x += 1;
    }
}