import { Ball } from '../../Ball/Ball';
import { HitBox } from '../HitBox';
import { Vector3 } from '../Vector3';

export function superCollide(ball: Ball, hitbox: HitBox) {
  const oldVelocity = new Vector3(
    ball.speed.x,
    ball.speed.y,
    ball.speed.z,
  );
  ball.speed = oldVelocity;
  console.log("old velocity prior collision : ", ball.speed);
  
  const zBigBoost = oldVelocity.z > 0 ? oldVelocity.z + 10 : oldVelocity.z - 10;
  ball.speed.z = zBigBoost;
  console.log("theZBigBoost", zBigBoost);
  setTimeout(() => {
    ball.isNormal = false;
  }, 2000);
}
