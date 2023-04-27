import { Vector3 } from './utils/Vector3';
import { EType } from './utils/config/enums';

export type TCollision = {
  type: EType;
  position: Vector3;
  direction: Vector3;
};

export type TScore = {
  team1: number;
  team2: number;
}