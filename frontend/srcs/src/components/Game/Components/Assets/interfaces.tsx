interface Vector3 {
    x: number;
    y: number;
    z: number;
}


interface Object3D {
    texture: string;
    type: string;
    width: number;
    height: number;
    depth: number;
    position: Vector3;
}

interface Wall extends Object3D {}
interface Floor extends Object3D {}
interface Ball extends Object3D {
    velocity: Vector3;
}
interface Goal extends Object3D {}
interface Paddle extends Object3D {}

export interface GameData {
    name: string;
    mode: string;
    width: number;
    height: number;
    depth: number;
    walls: Wall[];
    floor: Floor;
    ball: Ball;
    goals: Goal[];
    paddles: Paddle[];
} 

export function parseGameData(json : string) : GameData {
    const GameData = JSON.parse(json);
    return GameData;
}