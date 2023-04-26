import { Ball } from '../../Ball/Ball';
import { HitBox } from '../HitBox';
import { Vector3 } from '../Vector3';

export function goalCollide(ball: Ball, object: HitBox) {
  if (object.position.z < 0) {
    console.log("goal1");
  } else {
    console.log("goal2");
  }
  const position = new Vector3(
    ball.getPosition().x,
    ball.getPosition().y,
    ball.getPosition().y,
  );
  ball.resetPosition();

  return {
    position: position,
    direction: new Vector3(0, 0, object.position.z > 0 ? -1 : 1),
  };
}
