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

    getPostion() {
        return this.position;
    }
}