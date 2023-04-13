import { baseCollide } from '../utils/collisions/baseColide';
import { IPaddle } from './IPaddle';

export class BasePaddle extends IPaddle {
  public collide() {
    baseCollide();
  }
}
