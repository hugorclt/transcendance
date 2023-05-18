import { Ball } from '../../Ball/Ball';
import { HitBox } from '../HitBox';
import { Vector3 } from '../Vector3';

export function goalCollide(ball: Ball, object: HitBox) {
  const position = new Vector3(
    ball.getPosition().x,
    ball.getPosition().y,
    ball.getPosition().z,
  );
  ball.resetPosition();
  ball.resetSpeed(position);

  return {
    position: position,
    direction: new Vector3(0, 0, object.position.z > 0 ? -1 : 1),
  };
}
