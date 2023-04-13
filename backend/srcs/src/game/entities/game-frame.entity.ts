import { Mode, MapName } from '@prisma/client';
import { Ball } from '../resources/Ball';
import { Player } from '../resources/player/Player';
import { IObject } from '../resources/interfaces/IObject';

export class GameFrameEntity {
  ball: Ball;

  players: Player[];

  objects?: IObject[];
}
