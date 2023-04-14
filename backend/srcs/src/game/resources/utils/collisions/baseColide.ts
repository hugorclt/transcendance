import { Ball } from '../../Ball';
import { HitBox } from '../HitBox';

export function baseCollide(ball: HitBox, object: HitBox) {
  const overlapX =
    Math.min(ball.maxX, object.maxX) - Math.max(ball.minX, object.minX);
  const overlapY =
    Math.min(ball.maxY, object.maxY) - Math.max(ball.minY, object.minY);
  const overlapZ =
    Math.min(ball.maxZ, object.maxZ) - Math.max(ball.minZ, object.minZ);

  //1 - get the area of collision on plan (xy), (xz), (yz)
  const areaXY = overlapX * overlapY;
  const areaXZ = overlapX * overlapZ;
  const areaYZ = overlapY * overlapZ;

  //2 - the higher collision area should be the side of the object on which we collide
  if (areaXY > areaXZ && areaXY > areaYZ) {
  }
  //3 - invert ball velocity on the normal axis of this area
}
