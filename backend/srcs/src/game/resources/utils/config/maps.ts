import { EType } from 'shared/enum';
import { Vector3 } from 'src/game/resources/utils/Vector3';
import { generateBase64Image } from 'src/utils/base64';

export const maps = [{
  name: 'SPACE',
  mode: 'CHAMPIONS',
  miniature: generateBase64Image('/app/assets/paddle/red-paddle.gif'),
  width: 16,
  height: 9,
  depth: 35,
  walls: [
    {
      texture: generateBase64Image('/app/assets/paddle/red-paddle.gif'),
      type: EType.GRID,
      width: 1,
      height: 9,
      depth: 35,
      position: new Vector3(-8, 0, 0),
    },
    {
      texture: generateBase64Image('/app/assets/paddle/red-paddle.gif'),
      type: EType.GRID,
      width: 1,
      height: 9,
      depth: 35,
      position: new Vector3(8, 0, 0),
    },
    {
      texture: generateBase64Image('/app/assets/paddle/red-paddle.gif'),
      type: EType.GRID,
      width: 16,
      height: 1,
      depth: 35,
      position: new Vector3(0, -4.5, 0),
    },
    {
      texture: generateBase64Image('/app/assets/paddle/red-paddle.gif'),
      type: EType.GRID,
      width: 16,
      height: 1,
      depth: 35,
      position: new Vector3(0, 4.5, 0),
    },
  ],
  objects: [
    {
      texture: generateBase64Image('/app/assets/paddle/red-paddle.gif'),
      type: EType.SLOW,
      width: 1.5,
      height: 1,
      depth: 1,
      position: new Vector3(-1.5, 0, 0),
    },
    {
      texture: generateBase64Image('/app/assets/paddle/red-paddle.gif'),
      type: EType.BOOST,
      width: 1.5,
      height: 1,
      depth: 1,
      position: new Vector3(0, -1.5, 0),
    },
    {
      texture: generateBase64Image('/app/assets/paddle/red-paddle.gif'),
      type: EType.BREAKABLE_BRICK,
      width: 1.5,
      height: 1,
      depth: 1,
      position: new Vector3(0, 1.5, 0),
    },
    {
      texture: generateBase64Image('/app/assets/paddle/red-paddle.gif'),
      type: EType.UNBREAKABLE_BRICK,
      width: 1.5,
      height: 1,
      depth: 1,
      position: new Vector3(1.5, 0, 0),
    },
  ],
  ball: {
    texture: generateBase64Image('/app/assets/paddle/red-paddle.gif'),
    type: EType.SPHERE,
    width: 0.5,
    height: 0.5,
    depth: 0.5,
    position: new Vector3(0, 0, 0),
    velocity: new Vector3(1, 1, 3),
  },
  goals: {
    texture: generateBase64Image('/app/assets/paddle/red-paddle.gif'),
    type: EType.BOX,
    width: 16,
    height: 9,
    depth: 1,
  },
  paddle: {
    width: 2,
    height: 2,
    depth: 0.2,
  },
}, {
  name: 'CLASSIC',
  mode: 'CLASSIC',

  miniature: generateBase64Image('/app/assets/paddle/red-paddle.gif'),
  width: 16,
  height: 9,
  depth: 35,
  walls: [
    {
      texture: generateBase64Image('/app/assets/paddle/red-paddle.gif'),
      type: EType.BOX,
      width: 1,
      height: 1,
      depth: 35,
      position: new Vector3(-8, 0, 0),
    },
    {
      texture: generateBase64Image('/app/assets/paddle/red-paddle.gif'),
      type: EType.BOX,
      width: 1,
      height: 1,
      depth: 35,
      position: new Vector3(8, 0, 0),
    },
    {
      texture: generateBase64Image('/app/assets/paddle/red-paddle.gif'),
      type: EType.BOX,
      width: 16,
      height: 1,
      depth: 35,
      position: new Vector3(0, -1, 0),
    },
  ],
  ball: {
    texture: generateBase64Image('/app/assets/paddle/red-paddle.gif'),
    type: EType.SPHERE,
    width: 0.5,
    height: 0.5,
    depth: 0.5,
    position: new Vector3(0, 0, 0),
    velocity: new Vector3(0, 0, 0),
  },
  goals: {
    texture: generateBase64Image('/app/assets/paddle/red-paddle.gif'),
    type: EType.BOX,
    width: 16,
    height: 1,
    depth: 1,
  },
  paddle: {
    width: 2,
    height: 1,
    depth: 0.5,
  },
}]
