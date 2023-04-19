import { EType } from 'shared/enum';
import { Ball } from '../Ball/Ball';
import { TCollision } from '../types';
import { baseCollide } from '../utils/collisions/baseColide';
import { IPaddle } from './IPaddle';

export class BluePaddle extends IPaddle {
    public collide(ball: Ball): TCollision {
        const collision = baseCollide(ball, this._hitBox);
        return { ...collision, type: EType.BLUE_PADDLE };
    }
}