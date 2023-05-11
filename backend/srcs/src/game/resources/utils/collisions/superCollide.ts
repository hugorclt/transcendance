import { Ball } from '../../Ball/Ball';
import { HitBox } from '../HitBox';
import { Vector3 } from '../Vector3';

export function superCollide(ball: Ball, hitbox: HitBox) {
  const oldVelocity = new Vector3(
    ball.getOldVelocity().x,
    ball.getOldVelocity().y,
    ball.getOldVelocity().z,
  );
  ball.setOldVelocity(oldVelocity);
  console.log("old velocity prior collision : ", ball.getOldVelocity());
}
