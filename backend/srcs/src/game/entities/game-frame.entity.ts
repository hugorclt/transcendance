import { Mode, MapName } from '@prisma/client';
import { Ball } from '../resources/Ball';
import { Player } from '../resources/player/Player';
import { IObject } from '../resources/interfaces/IObject';
import { TCollision } from '../resources/types';

export class GameFrameEntity {
  timestamp: number;

  ball: Ball;

  players: Player[];

  collisions?: TCollision[];

  objects?: IObject[];
}
