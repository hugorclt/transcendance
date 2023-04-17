import { Ball } from '../../Ball';
import { HitBox } from '../HitBox';
import { Vector3 } from '../Vector3';

export function goalCollide(ball: Ball, object: HitBox) {
  if (object.position.z < 0) {
    //goal de l'equipe 1
    console.log("goal de l'equipe 1");
  } else {
    //goal de l'equipe 2
    console.log("goal de l'equipe 2");
  }
  // console.log('reseting ball position: position was: ', ball.getPosition());
  // ball.resetPosition();
  // console.log(
  //   'ball new position: ',
  //   ball.getPosition(),
  //   ' should be: ',
  //   ball.initialPosition,
  // );
  return {
    position: ball.getPosition(),
    direction: new Vector3(0, 0, object.position.z > 0 ? -1 : 1),
  };
}
