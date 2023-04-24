import { TCollision } from 'src/game/resources/types';
import { EType } from './enum';

export interface Object3D {
  type: EType;
  texture?: string;
  width: number;
  height: number;
  depth: number;
  position: {
    x: number;
    y: number;
    z: number;
  };
  velocity?: {
    x: number;
    y: number;
    z: number;
  };
}

export interface IPlayer {
  id: string;
  team: boolean;
  paddle: Object3D;
}

export interface IField {
  walls: Object3D[];
  objects: Object3D[];
  goals: Object3D[];
}

export interface IGameInfo {
  field: IField;
  ball: Object3D;
  players: IPlayer[];
}

export interface IFrame {
  timestamp: number;
  players: IPlayer[];
  ball: Object3D;
  collisions: TCollision[]; //A CHANGER
}
