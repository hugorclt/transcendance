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

export interface Player {
  id: string;
  team: string;
  paddle: Object3D;
}

export interface Field {
  walls: Object3D[];
  objects: Object3D[];
  goals: Object3D[];
}

export interface IGameInfo {
  field: Field;
  ball: Object3D;
  players: Player[];
}
