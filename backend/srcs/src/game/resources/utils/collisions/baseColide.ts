import { HitBox } from '../HitBox';

export function baseCollide() {}

export function collideVolumes(ball: HitBox, object: HitBox) {
  //1 - get the area of collision on plan (xy), (xz), (yz)
  //2 - the higher collision area should be the side of the object on which we collide
  //3 - invert ball velocity on the normal axis of this area
  //1
}
