import { Ball } from '../../Ball/Ball';
import { HitBox } from '../HitBox';
import { Vector3 } from '../Vector3';

export function superCollide(ball: Ball, hitbox: HitBox) {
  const oldVelocity = new Vector3(
    ball.speed.x,
    ball.speed.y,
    ball.speed.z,
  );
  ball.oldVelocity = oldVelocity;
  
  const zBigBoost = -oldVelocity.z * 3;
  ball.speed.z = zBigBoost;
  console.log("theZBigBoost", zBigBoost);
  ball.isNormal = false;
}



export function superCollide2(ball: Ball, hitbox: HitBox) {
  const oldVelocity = new Vector3(
    ball.speed.x,
    ball.speed.y,
    ball.speed.z,
  );
  ball.oldVelocity = oldVelocity;


  const bounce = new Vector3(
    ball.speed.x * -1,
    ball.speed.y * -1,
    ball.speed.z * -1,
  );
  // let ballPosition : Vector3 = ball.getPosition()
  // let paddlePosition : Vector3 = hitbox.getPosition()


  ball.isNormal = false;
  
  let d = hitbox.getPosition().z > 0 ? -0.5 : 0.5;
  const startTime = Date.now();
  const intervalId = setInterval(() => {
    if (Date.now() - startTime >= 3000) {
      clearInterval(intervalId);
      ball.speed = ball.oldVelocity;
    } else { 
      let paddlePosition : Vector3 = hitbox.getPosition();
      
      let ballPosition : Vector3 = new Vector3(
        paddlePosition.x,
        paddlePosition.y,
        paddlePosition.z + d,
      );
      
      ball.setPosition(ballPosition);
      ball.speed.x = 0;
      ball.speed.y = 0;
      ball.speed.z = 0;
    }
  }, 10);
}