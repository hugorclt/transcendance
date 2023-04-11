import { Vector3 } from '../Vector3';

export const BasePaddleConfig = {
  width: 240,
  height: 240,
  depth: 30,
};

export const BallConfig = {
  width: 100,
  height: 100,
  depth: 100,
  position: new Vector3(0, 0, 0),
  speed: new Vector3(0, 0, 1),
};

export const BaseFieldConfig = {
  width: 1920,
  height: 1080,
  depth: 5000,
  VerticalWallConfig: {
    width: 10,
    height: 1080,
    depth: 5000,
  },
  HorizontalWallConfig: {
    width: 1920,
    height: 10,
    depth: 5000,
  },
};
