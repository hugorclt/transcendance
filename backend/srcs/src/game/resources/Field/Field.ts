import { IObject } from '../interfaces/IObject';
import { Vector3 } from '../utils/Vector3';
import { Goal } from './Goal/Goal';
import { Wall } from './Wall/Wall';

export class Field {
  private _walls: Array<Wall>;
  private _goals: Array<Goal>;
  private _objects: Array<IObject>;

  public constructor(config: any) {
    this._walls = new Array<Wall>();
    this._objects = new Array<IObject>();
    this._goals = new Array<Goal>();
    this._init_goals(config);
    this._init_walls(config);
    this._init_objects(config);
  }

  private _init_walls(config: any) {
    console.log('creating walls: ', config.walls);
    config.walls.forEach((wall) => {
      this._walls.push(
        new Wall(wall)
        // new Wall(
        //   wall.width,
        //   wall.height,
        //   wall.depth,
        //   new Vector3(wall.position.x, wall.position.y, wall.position.z),
        // ),
      );
    });
  }

  private _init_objects(config: any) {
    console.log('creating objects: ', config.objects);
    config.objects?.forEach((object) => {
      console.log("creating object: ", object);
    })
  }

  private _init_goals(config: any) {
    this._goals.push(
      // new Goal(
      //   config.goals.width,
      //   config.goals.height,
      //   config.goals.depth,
      //   new Vector3(0, 0, config.depth / 2 + config.goals.depth),
      //   config.goals.texture,
      //   config.goals.type
      // ),
      new Goal({...config.goals, position: new Vector3(0, 0, config.depth / 2 + config.goals.depth)})
    );
    this._goals.push(
      // new Goal(
      //   config.goals.width,
      //   config.goals.height,
      //   config.goals.depth,
      //   new Vector3(0, 0, -config.depth / 2 - config.goals.depth),
      //   config.goals.texture,
      //   config.goals.type
      // ),
      new Goal({...config.goals, position: new Vector3(0, 0, -config.depth / 2 - config.goals.depth)})
    );
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

  // private _createClassicWalls() {
  //   this._walls.push(
  //     new Wall(
  //       ClassicFieldConfig.VerticalWallConfig.width,
  //       ClassicFieldConfig.VerticalWallConfig.height,
  //       ClassicFieldConfig.VerticalWallConfig.depth,
  //       new Vector3(-(ClassicFieldConfig.width / 2), 0, 0),
  //     ),
  //   );
  //   this._walls.push(
  //     new Wall(
  //       ClassicFieldConfig.VerticalWallConfig.width,
  //       ClassicFieldConfig.VerticalWallConfig.height,
  //       ClassicFieldConfig.VerticalWallConfig.depth,
  //       new Vector3(ClassicFieldConfig.width / 2, 0, 0),
  //     ),
  //   );
  //   this._walls.push(
  //     new Wall(
  //       ClassicFieldConfig.HorizontalWallConfig.width,
  //       ClassicFieldConfig.HorizontalWallConfig.height,
  //       ClassicFieldConfig.HorizontalWallConfig.depth,
  //       new Vector3(0, -ClassicFieldConfig.height, 0),
  //     ),
  //   );
  // }

  // //version 3d
  // private _createChampionsWalls() {
  //   //vertical wall left
  //   this._walls.push(
  //     new Wall(
  //       ThreeDFieldConfig.VerticalWallConfig.width,
  //       ThreeDFieldConfig.VerticalWallConfig.height,
  //       ThreeDFieldConfig.VerticalWallConfig.depth,
  //       new Vector3(-(ThreeDFieldConfig.width / 2), 0, 0),
  //     ),
  //   );
  //   //vertical wall right
  //   this._walls.push(
  //     new Wall(
  //       ThreeDFieldConfig.VerticalWallConfig.width,
  //       ThreeDFieldConfig.VerticalWallConfig.height,
  //       ThreeDFieldConfig.VerticalWallConfig.depth,
  //       new Vector3(ThreeDFieldConfig.width / 2, 0, 0),
  //     ),
  //   );
  //   //floor
  //   this._walls.push(
  //     new Wall(
  //       ThreeDFieldConfig.HorizontalWallConfig.width,
  //       ThreeDFieldConfig.HorizontalWallConfig.height,
  //       ThreeDFieldConfig.HorizontalWallConfig.depth,
  //       new Vector3(0, -(ThreeDFieldConfig.height / 2), 0),
  //     ),
  //   );
  //   //ceiling
  //   this._walls.push(
  //     new Wall(
  //       ThreeDFieldConfig.HorizontalWallConfig.width,
  //       ThreeDFieldConfig.HorizontalWallConfig.height,
  //       ThreeDFieldConfig.HorizontalWallConfig.depth,
  //       new Vector3(0, ThreeDFieldConfig.height / 2, 0),
  //     ),
  //   );
  // }
}
