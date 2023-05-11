import { IField } from 'shared/gameInterfaces';
import { IObject } from '../interfaces/IObject';
import { Vector3 } from '../utils/Vector3';
import { Goal } from './Goal/Goal';
import { Wall } from './Wall/Wall';

export class Field {
  private _walls: Array<Wall>;
  private _goals: Array<Goal>;
  private _objects: Array<IObject>;
  private _skybox: string;

  public constructor(config: any) {
    this._walls = new Array<Wall>();
    this._objects = new Array<IObject>();
    this._goals = new Array<Goal>();
    this._skybox = config.miniature;
    this._init_goals(config);
    this._init_walls(config);
    this._init_objects(config);
  }

  private _init_walls(config: any) {
    config.walls.forEach((wall) => {
      this._walls.push(new Wall(wall));
    });
  }

  private _init_objects(config: any) {
    config.objects?.forEach((object) => {
      console.log('creating object');
    });
  }

  private _init_goals(config: any) {
    this._goals.push(
      new Goal({
        ...config.goals,
        position: new Vector3(0, 0, config.depth / 2 + 2 * config.goals.depth),
      }),
    );
    this._goals.push(
      new Goal({
        ...config.goals,
        position: new Vector3(0, 0, -config.depth / 2 - 2 * config.goals.depth),
      }),
    );
  }

  public exportFieldInfo(): IField {
    const walls = this._walls.map((wall) => wall.exportInfo());
    const objects = this._objects.map((object) => object.exportInfo());
    const goals = this._goals.map((goal) => goal.exportInfo());
    return { walls: walls, objects: objects, goals: goals, skybox: this._skybox };
  }

  public get walls(): Array<Wall> {
    return this._walls;
  }
  public get objects(): Array<IObject> {
    return this._objects;
  }
  public get goals(): Array<Goal> {
    return this._goals;
  }
}
