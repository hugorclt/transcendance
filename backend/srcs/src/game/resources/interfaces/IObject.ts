import { EType } from 'shared/enum';
import { Ball } from '../Ball/Ball';
import { TCollision } from '../types';
import { HitBox } from '../utils/HitBox';
import { Vector3 } from '../utils/Vector3';
import { Object3D } from 'shared/gameInterfaces';

export type CreateObjectDto = {
  width: number;
  height: number;
  depth: number;
  position: Vector3;
  texture?: string;
  type?: EType;
};

export type Tface = {
  a: number;
  b: number;
  c: number;
  d: number;
};

export abstract class IObject {
  protected texture: string = '';
  protected type: EType = EType.BOX;
  protected _initialPosition: Vector3;
  protected _hitBox: HitBox;

  public constructor(data: CreateObjectDto) {
    this._initialPosition = data.position;
    this._hitBox = new HitBox(
      data.width,
      data.height,
      data.depth,
      data.position,
    );
    if (data.texture) this.texture = data.texture;
    if (data.type) this.type = data.type;
  }

  /* --------------------------------- getters -------------------------------- */
  public get hitBox() {
    return this._hitBox;
  }

  public get initialPosition(): Vector3 {
    return this._initialPosition;
  }

  public getWidth(): number {
    return this._hitBox.width;
  }
  public getHeight() {
    return this._hitBox.height;
  }
  public getDepth() {
    return this._hitBox.depth;
  }
  public getPosition() {
    return this._hitBox.position;
  }
  public getIntersections(origin: Vector3, directors: Vector3) {
    //equation parametrique d'une droite de point origin(X,Y,Z) et de directeur(X,Y,Z)
    //l'equation parametrique est:
    // x = originX + directorX * t
    // y = originY + directorY * t
    // z = originZ + directorZ * t
    const faces = new Array<Tface>();

    //pour trouver l'equation des plans des faces de la hitbox, on prends les deux coins opposes
    // const angle1 = ( this._hitBox.minX, this._hitBox.minY, this._hitBox.minZ);
    // const angle2 = ( this._hitBox.maxX, this._hitBox.maxY, this._hitBox.maxZ);
    //dans un repere orthonorme, les hitbox sont toutes alignees avec les axes et les vecteurs normaux ont une seule composante
    //on determine l'equation de 3 des faces avec chaque angle et les 3 vecteur normaux (0,0,1) (0,1,0) (1,0,0)
    //ax + by + cz + d =0;
    //d = -ax -by -cz
    faces.push({ a: 0, b: 0, c: 1, d: -this._hitBox.minZ });
    faces.push({ a: 0, b: 1, c: 0, d: -this._hitBox.minY });
    faces.push({ a: 1, b: 0, c: 0, d: -this._hitBox.minX });

    faces.push({ a: 0, b: 0, c: 1, d: -this._hitBox.maxZ });
    faces.push({ a: 0, b: 1, c: 0, d: -this._hitBox.maxY });
    faces.push({ a: 1, b: 0, c: 0, d: -this._hitBox.maxX });

    faces.forEach((face) => {
      //il faut maintenant trouver le point d'intersection entre la droite et chaque face,
      //_______a * x________________________  +  __________b * y____________________  +  ________ c * z ____________________  + __d___ = 0
      //face.a * (origin.x + directors.x * t) + face.b * (origin.y + directors.y * t) + face.c * (origin.z + directors.z * t) + face.d = 0
      //si le point appartient a la hitbox && que le point fait partie du segment de droite
      //alors il y a eu collision entre l'objet et la face
      //on enregistre alors la face en question et le point d'intersection
    });
    return faces;
  }

  /* --------------------------------- setters -------------------------------- */
  public setPosition(position: Vector3) {
    this._hitBox.position = position;
  }
  public setWidth(width: number) {
    this._hitBox.width = width;
  }
  public setHeight(height: number) {
    this._hitBox.height = height;
  }
  public setDepth(depth: number) {
    this._hitBox.depth = depth;
  }

  public resetPosition() {
    this._hitBox.position = new Vector3(
      this._initialPosition.x,
      this._initialPosition.y,
      this._initialPosition.z,
    );
  }
  public move(x: number, y: number) {
    this._hitBox.updatePosition(x, y, this._hitBox.position.z);
  }

  public moveX(incrX: number) {
    this._hitBox.updatePosition(
      this._hitBox.position.x + incrX,
      this._hitBox.position.y,
      this._hitBox.position.z,
    );
  }
  public moveY(incrY: number) {
    this._hitBox.updatePosition(
      this._hitBox.position.x,
      this._hitBox.position.y + incrY,
      this._hitBox.position.z,
    );
  }
  public moveZ(incrZ: number) {
    this._hitBox.updatePosition(
      this._hitBox.position.x,
      this._hitBox.position.y,
      this._hitBox.position.z + incrZ,
    );
  }

  public exportInfo(): Object3D {
    return {
      type: this.type,
      texture: this.texture,
      width: this.getWidth(),
      height: this.getHeight(),
      depth: this.getDepth(),
      position: {
        x: this._hitBox.position.x,
        y: this._hitBox.position.y,
        z: this._hitBox.position.z,
      },
    };
  }

  public exportFrame(): Object3D {
    return {
      type: this.type,
      width: this.getWidth(),
      height: this.getHeight(),
      depth: this.getDepth(),
      position: {
        x: this._hitBox.position.x,
        y: this._hitBox.position.y,
        z: this._hitBox.position.z,
      },
    };
  }

  public abstract collide?(ball: Ball): TCollision;
}
