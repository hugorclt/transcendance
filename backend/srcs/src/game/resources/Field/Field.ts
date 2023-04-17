import { IObject } from '../interfaces/IObject';
import { Vector3 } from '../utils/Vector3';
import {
  BaseFieldConfig,
  ClassicFieldConfig,
  ThreeDFieldConfig,
} from '../utils/config/config';
import { EField } from '../utils/config/enums';
import { Goal } from './Goal/Goal';
import { Wall } from './Wall/Wall';

export class Field {
  private _walls: Array<Wall>;
  private _goals: Array<Goal>;
  private _objects: Array<IObject>;

  constructor(fieldType: EField) {
    this._walls = new Array<Wall>();
    this._objects = new Array<IObject>();
    this._goals = new Array<Goal>();
    switch (fieldType) {
      case EField.CLASSIC:
        this._createClassicWalls();
        this._createClassicGoals();
        break;
      case EField.CHAMPIONS:
        this._createChampionsWalls();
        this._createThreeDGoals();
        break;
    }
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

  private _createThreeDGoals() {
    this._goals.push(
      new Goal(
        ThreeDFieldConfig.GoalConfig.width,
        ThreeDFieldConfig.GoalConfig.height,
        ThreeDFieldConfig.GoalConfig.depth,
        new Vector3(
          0,
          0,
          ThreeDFieldConfig.depth / 2 + ThreeDFieldConfig.GoalConfig.depth,
        ),
      ),
    );
    this._goals.push(
      new Goal(
        ThreeDFieldConfig.GoalConfig.width,
        ThreeDFieldConfig.GoalConfig.height,
        ThreeDFieldConfig.GoalConfig.depth,
        new Vector3(
          0,
          0,
          -ThreeDFieldConfig.depth / 2 - ThreeDFieldConfig.GoalConfig.depth,
        ),
      ),
    );
  }
  private _createClassicGoals() {
    this._goals.push(
      new Goal(
        ClassicFieldConfig.GoalConfig.width,
        ClassicFieldConfig.GoalConfig.height,
        ClassicFieldConfig.GoalConfig.depth,
        new Vector3(
          0,
          0,
          ClassicFieldConfig.depth / 2 + ClassicFieldConfig.GoalConfig.depth,
        ),
      ),
    );
    this._goals.push(
      new Goal(
        ClassicFieldConfig.GoalConfig.width,
        ClassicFieldConfig.GoalConfig.height,
        ClassicFieldConfig.GoalConfig.depth,
        new Vector3(
          0,
          0,
          -ClassicFieldConfig.depth / 2 - ClassicFieldConfig.GoalConfig.depth,
        ),
      ),
    );
  }

  private _createClassicWalls() {
    this._walls.push(
      new Wall(
        ClassicFieldConfig.VerticalWallConfig.width,
        ClassicFieldConfig.VerticalWallConfig.height,
        ClassicFieldConfig.VerticalWallConfig.depth,
        new Vector3(-(ClassicFieldConfig.width / 2), 0, 0),
      ),
    );
    this._walls.push(
      new Wall(
        ClassicFieldConfig.VerticalWallConfig.width,
        ClassicFieldConfig.VerticalWallConfig.height,
        ClassicFieldConfig.VerticalWallConfig.depth,
        new Vector3(ClassicFieldConfig.width / 2, 0, 0),
      ),
    );
    this._walls.push(
      new Wall(
        ClassicFieldConfig.HorizontalWallConfig.width,
        ClassicFieldConfig.HorizontalWallConfig.height,
        ClassicFieldConfig.HorizontalWallConfig.depth,
        new Vector3(0, -ClassicFieldConfig.height, 0),
      ),
    );
  }

  //version 3d
  private _createChampionsWalls() {
    //vertical wall left
    this._walls.push(
      new Wall(
        ThreeDFieldConfig.VerticalWallConfig.width,
        ThreeDFieldConfig.VerticalWallConfig.height,
        ThreeDFieldConfig.VerticalWallConfig.depth,
        new Vector3(-(ThreeDFieldConfig.width / 2), 0, 0),
      ),
    );
    //vertical wall right
    this._walls.push(
      new Wall(
        ThreeDFieldConfig.VerticalWallConfig.width,
        ThreeDFieldConfig.VerticalWallConfig.height,
        ThreeDFieldConfig.VerticalWallConfig.depth,
        new Vector3(ThreeDFieldConfig.width / 2, 0, 0),
      ),
    );
    //floor
    this._walls.push(
      new Wall(
        ThreeDFieldConfig.HorizontalWallConfig.width,
        ThreeDFieldConfig.HorizontalWallConfig.height,
        ThreeDFieldConfig.HorizontalWallConfig.depth,
        new Vector3(0, -(ThreeDFieldConfig.height / 2), 0),
      ),
    );
    //ceiling
    this._walls.push(
      new Wall(
        ThreeDFieldConfig.HorizontalWallConfig.width,
        ThreeDFieldConfig.HorizontalWallConfig.height,
        ThreeDFieldConfig.HorizontalWallConfig.depth,
        new Vector3(0, ThreeDFieldConfig.height / 2, 0),
      ),
    );
  }
}
