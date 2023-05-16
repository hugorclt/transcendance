import { Ball } from '../../Ball/Ball';
import { HitBox } from '../HitBox';
import { Vector3 } from '../Vector3';

export function superCollide(ball: Ball, hitbox: HitBox) {
  const oldVelocity = new Vector3(ball.speed.x, ball.speed.y, ball.speed.z);
  ball.oldVelocity = oldVelocity;

  const zBigBoost = -oldVelocity.z * 3;
  ball.speed.z = zBigBoost;
  ball.isNormal = false;
}
