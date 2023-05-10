import { Ball } from '../../Ball/Ball';
import { HitBox } from '../HitBox';
import { Vector3 } from '../Vector3';

export function basePaddleCollide(ball: Ball, paddle: HitBox) {
  const xPos = ball.getPosition().x;
  const yPos = ball.getPosition().y;
  const { areaXY, areaXZ, areaYZ } = getCollisionInfo(ball, paddle);

  let deltaX: number;
  let deltaY: number;
  let thetaX: number;
  let thetaY: number;

  const norm = Math.sqrt(
    Math.pow(ball.speedX, 2) +
      Math.pow(ball.speedY, 2) +
      Math.pow(ball.speedZ, 2),
  );

  console.log('norm of speed vector: ', norm);
  if (xPos > paddle.position.x) {
    deltaX = (xPos - paddle.position.x) / (paddle.width / 2);
    thetaX = 45 * deltaX;
  } else if (xPos <= paddle.position.x) {
    deltaX = (paddle.position.x - xPos) / (paddle.width / 2);
    thetaX = -45 * deltaX;
  }
  if (yPos > paddle.position.y) {
    deltaY = (yPos - paddle.position.y) / (paddle.height / 2);
    thetaY = 45 * deltaY;
  } else if (yPos <= paddle.position.y) {
    deltaY = (paddle.position.y - yPos) / (paddle.height / 2);
    thetaY = -45 * deltaY;
  }

  console.log(
    'On collision with paddle, apply rotation ThetaX: ',
    thetaX,
    ' and ThetaY: ',
    thetaY,
    ' on vector: { 0, 0, ',
    norm,
    '}',
  );
  //apply both rotations on normal vector [0,0,norm or -norm depending on direction]
  if (ball.speedZ < 0) var { x2, y2, z2 } = rotateX(thetaY, 0, 0, norm);
  else var { x2, y2, z2 } = rotateX(thetaY, 0, 0, -norm);
  let newSpeed = rotateY(thetaX, x2, y2, z2);

  console.log(
    'newSpeed: ',
    newSpeed,
    ' was calculated after first rotation with X2 = ',
    x2,
    ' Y2 = ',
    y2,
    ' Z2 = ',
    z2,
  );
  //change ball speed
  ball.speedX = newSpeed.x2;
  ball.speedY = newSpeed.y2;
  ball.speedZ = newSpeed.z2;

  if (areaXY > areaXZ && areaXY > areaYZ) {
    // revert z velocity
    return {
      position: ball.getPosition(),
      direction: new Vector3(0, 0, ball.speedZ > 0 ? 1 : -1),
    };
  } else if (areaXZ > areaXY && areaXZ > areaYZ) {
    // revert y velocity
    return {
      position: ball.getPosition(),
      direction: new Vector3(0, ball.speedY > 0 ? 1 : -1, 0),
    };
  } else {
    // revert x velocity
    return {
      position: ball.getPosition(),
      direction: new Vector3(ball.speedX > 0 ? 1 : -1, 0, 0),
    };
  }
}

export function baseCollide(ball: Ball, object: HitBox) {
  console.log('base collide');
  const { areaXY, areaXZ, areaYZ } = getCollisionInfo(ball, object);
  if (areaXY > areaXZ && areaXY > areaYZ) {
    // revert z velocity
    ball.speedZ = -ball.speedZ;
    return {
      position: ball.getPosition(),
      direction: new Vector3(0, 0, ball.speedZ > 0 ? 1 : -1),
    };
  } else if (areaXZ > areaXY && areaXZ > areaYZ) {
    // revert y velocity
    ball.speedY = -ball.speedY;
    return {
      position: ball.getPosition(),
      direction: new Vector3(0, ball.speedY > 0 ? 1 : -1, 0),
    };
  } else {
    // revert x velocity
    ball.speedX = -ball.speedX;
    return {
      position: ball.getPosition(),
      direction: new Vector3(ball.speedX > 0 ? 1 : -1, 0, 0),
    };
  }
}

/* ----------------------------- Helper function ---------------------------- */
export function getCollisionInfo(ball: Ball, object: HitBox) {
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
  } else if (areaXZ > areaXY && areaXZ > areaYZ) {
    // Collision on XZ plane
    // correct collision
    if (ball.speedY > 0) {
      ball.moveY(-overlapY);
    } else {
      ball.moveY(overlapY);
    }
  } else {
    // Collision on YZ plane
    // correct collision
    if (ball.speedX > 0) {
      ball.moveX(-overlapX);
    } else {
      ball.moveX(overlapX);
    }
  }
  return { areaXY, areaXZ, areaYZ };
}

/* --------------------------- Rotation functions --------------------------- */
export function rotateX(angle: number, x: number, y: number, z: number) {
  //fais tourner Y vers Z
  const x2 = x * 1 + y * 0 + z * 0;
  const y2 = x * 0 + y * Math.cos(angle) - z * Math.sin(angle);
  const z2 = x * 0 + y * Math.sin(angle) + z * Math.cos(angle);

  return { x2, y2, z2 };
}

export function rotateY(angle: number, x: number, y: number, z: number) {
  //fais tourner Z vers X
  const x2 = x * Math.cos(angle) + y * 0 + z * Math.sin(angle);
  const y2 = x * 0 + y * 1 + z * 0;
  const z2 = -x * Math.sin(angle) + y * 0 + z * Math.cos(angle);

  return { x2, y2, z2 };
}

export function rotateZ(angle: number, x: number, y: number, z: number) {
  //fais tourner X vers Y
  //non utilise par les paddles
  const x2 = x * Math.cos(angle) - y * Math.sin(angle) + z * 0;
  const y2 = x * Math.sin(angle) + y * Math.cos(angle) + z * 0;
  const z2 = x * 0 + y * 0 + z * 1;

  return { x2, y2, z2 };
}
