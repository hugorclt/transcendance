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
    // revert z velocity
    if (ball.speedZ > 0) {
      ball.moveZ(-overlapZ);
    } else {
      ball.moveZ(overlapZ);
    }
    ball.speedZ = -ball.speedZ;
  } else if (areaXZ > areaXY && areaXZ > areaYZ) {
    // Collision on XZ plane
    // revert y velocity
    if (ball.speedY > 0) {
      ball.moveY(-overlapY);
    } else {
      ball.moveY(overlapY);
    }
    ball.speedY = -ball.speedY;
  } else {
    // Collision on YZ plane
    // revert x velocity
    if (ball.speedY > 0) {
      ball.moveX(-overlapX);
    } else {
      ball.moveX(overlapX);
    }
    ball.speedX = -ball.speedX;
  }
}
