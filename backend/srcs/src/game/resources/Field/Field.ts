import { IObject } from '../interfaces/IObject';
import { Vector3 } from '../utils/Vector3';
import { BaseFieldConfig, ClassicFieldConfig } from '../utils/config/config';
import { EField } from '../utils/config/enums';
import { Wall } from './wall/Wall';

export class Field {
  private _walls: Array<Wall>;
  private _objects: Array<IObject>;

  constructor(fieldType: EField) {
    this._walls = new Array<Wall>();
    this._objects = new Array<IObject>();
    switch (fieldType) {
      case EField.CLASSIC:
        this._createClassicWalls();
        break;
    }
  }

  public get walls(): Array<Wall> {
    return this._walls;
  }
  public get objects(): Array<IObject> {
    return this._objects;
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
  private _createBasicWalls() {
    //vertical wall left
    this._walls.push(
      new Wall(
        BaseFieldConfig.VerticalWallConfig.width,
        BaseFieldConfig.VerticalWallConfig.height,
        BaseFieldConfig.VerticalWallConfig.depth,
        new Vector3(-(BaseFieldConfig.width / 2), 0, 0),
      ),
    );
    //vertical wall right
    this._walls.push(
      new Wall(
        BaseFieldConfig.VerticalWallConfig.width,
        BaseFieldConfig.VerticalWallConfig.height,
        BaseFieldConfig.VerticalWallConfig.depth,
        new Vector3(BaseFieldConfig.width / 2, 0, 0),
      ),
    );
    //floor
    this._walls.push(
      new Wall(
        BaseFieldConfig.HorizontalWallConfig.width,
        BaseFieldConfig.HorizontalWallConfig.height,
        BaseFieldConfig.HorizontalWallConfig.depth,
        new Vector3(0, -(BaseFieldConfig.height / 2), 0),
      ),
    );
    //ceiling
    this._walls.push(
      new Wall(
        BaseFieldConfig.HorizontalWallConfig.width,
        BaseFieldConfig.HorizontalWallConfig.height,
        BaseFieldConfig.HorizontalWallConfig.depth,
        new Vector3(0, BaseFieldConfig.height / 2, 0),
      ),
    );
  }
}
