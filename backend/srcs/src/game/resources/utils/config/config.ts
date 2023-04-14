import { Vector3 } from '../Vector3';

export const BasePaddleConfig = {
  width: 2,
  height: 2,
  depth: 0.1,
};

export const BallConfig = {
  width: 0.5,
  height: 0.5,
  depth: 0.5,
  position: new Vector3(0, 5, 0),
  speed: new Vector3(0, 0, 1),
};

export const BaseFieldConfig = {
  width: 16,
  height: 9,
  depth: 35,
  VerticalWallConfig: {
    width: 1,
    height: 9,
    depth: 35,
  },
  HorizontalWallConfig: {
    width: 16,
    height: 1,
    depth: 35,
  },
};

/* -------------------------------------------------------------------------- */
/*                               CLASSIC CONFIG                               */
/* -------------------------------------------------------------------------- */
export const ClassicBallConfig = {
  width: 0.5,
  height: 1,
  depth: 0.5,
  position: new Vector3(0, 0.5, 0),
  speed: new Vector3(1, 0, 4),
};
export const ClassicPaddleConfig = {
  width: 2,
  height: 1,
  depth: 0.1,
};

export const ClassicFieldConfig = {
  width: 16,
  height: 1,
  depth: 35,
  GoalConfig: {
    width: 16,
    height: 1,
    depth: 1,
  },
  VerticalWallConfig: {
    width: 1,
    height: 1,
    depth: 35,
  },
  HorizontalWallConfig: {
    width: 16,
    height: 1,
    depth: 35,
  },
};

/* -------------------------------------------------------------------------- */
/*                                  3D Config                                 */
/* -------------------------------------------------------------------------- */

export const ThreeDBallConfig = {
  width: 0.5,
  height: 0.5,
  depth: 0.5,
  position: new Vector3(0, 0, 0),
  speed: new Vector3(2, 2, 4),
};
export const ThreeDPaddleConfig = {
  width: 2,
  height: 2,
  depth: 0.2,
};

export const ThreeDFieldConfig = {
  width: 16,
  height: 9,
  depth: 35,
  GoalConfig: {
    width: 16,
    height: 9,
    depth: 1,
  },
  VerticalWallConfig: {
    width: 1,
    height: 9,
    depth: 35,
  },
  HorizontalWallConfig: {
    width: 16,
    height: 1,
    depth: 35,
  },
};
