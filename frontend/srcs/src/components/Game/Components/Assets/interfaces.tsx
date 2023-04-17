interface Vector3 {
    x: number;
    y: number;
    z: number;
}


export interface Object3D {
    texture: string;
    type: string;
    width: number;
    height: number;
    depth: number;
    position: Vector3;
}

export interface Wall extends Object3D {}
export interface Floor extends Object3D {}
export interface Ball extends Object3D {
    radius: number;
    velocity: Vector3;
}
export interface Goal extends Object3D {}
export interface Paddle extends Object3D {}

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