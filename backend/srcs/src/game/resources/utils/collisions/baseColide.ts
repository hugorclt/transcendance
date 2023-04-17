import { Ball } from '../../Ball';
import { HitBox } from '../HitBox';

export function baseCollide(ball: Ball, object: HitBox) {
  const ballHitBox = ball.hitBox;
  const overlapX =
    Math.min(ballHitBox.maxX, object.maxX) -
    Math.max(ballHitBox.minX, object.minX);
  const overlapY =
    Math.min(ballHitBox.maxY, object.maxY) -
    Math.max(ballHitBox.minY, object.minY);
  const overlapZ =
    Math.min(ballHitBox.maxZ, object.maxZ) -
    Math.max(ballHitBox.minZ, object.minZ);

  //1 - get the area of collision on plan (xy), (xz), (yz)
  const areaXY = overlapX * overlapY;
  const areaXZ = overlapX * overlapZ;
  const areaYZ = overlapY * overlapZ;

  //2 - the higher collision area should be the side of the object on which we collide
  if (areaXY > areaXZ && areaXY > areaYZ) {
    // Collision on XY plane
    // correct collision
    if (ball.speedZ > 0) {
      ball.moveZ(-overlapZ);
    } else {
      ball.moveZ(overlapZ);
    }
    // revert z velocity
    ball.speedZ = -ball.speedZ;
    console.log('Collision on XY plane, revert Z velocity: ', ball.speed);
  } else if (areaXZ > areaXY && areaXZ > areaYZ) {
    // Collision on XZ plane
    // correct collision
    if (ball.speedY > 0) {
      ball.moveY(-overlapY);
    } else {
      ball.moveY(overlapY);
    }
    // revert y velocity
    ball.speedY = -ball.speedY;
    console.log('Collision on XZ plane, revert Y velocity', ball.speed);
  } else {
    // Collision on YZ plane
    // correct collision
    if (ball.speedX > 0) {
      ball.moveX(-overlapX);
    } else {
      ball.moveX(overlapX);
    }
    // revert x velocity
    ball.speedX = -ball.speedX;
    console.log('Collision on YZ plane, revert X velocity', ball.speed);
  }
}
