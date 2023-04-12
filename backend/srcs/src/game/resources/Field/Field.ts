import { IObject } from '../interfaces/IObject';
import { Vector3 } from '../utils/Vector3';
import { BaseFieldConfig } from '../utils/config/config';
import { EField } from '../utils/config/enums';
import { Wall } from './wall/Wall';

export class Field {
  private _walls: Array<Wall>;

  constructor(fieldType: EField) {
    this._walls = new Array<Wall>();
    switch (fieldType) {
      case EField.BASIC:
        this._createBasicWalls();
        break;
    }
  }

  public get walls(): Array<Wall> {
    return this._walls;
  }
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
