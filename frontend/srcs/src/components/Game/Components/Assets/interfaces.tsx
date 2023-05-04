import { EType } from "../../../../shared/enum";

/*================================ INTERFACE ==============================*/

export type TCollision = {
  type: EType;
  position: {
    x: number;
    y: number;
    z: number;
  };
  direction: {
    x: number;
    y: number;
    z: number;
  };
};

export interface Object3D {
  type: EType;
  texture?: string;
  width: number;
  height: number;
  depth: number;
  position: {
    x: number;
    y: number;
    z: number;
  };
  velocity?: {
    x: number;
    y: number;
    z: number;
  };
}

export interface IPlayer {
  id: string;
  team: boolean;
  paddle: Object3D;
}

export interface IField {
  walls: Object3D[];
  objects: Object3D[];
  goals: Object3D[];
}

export interface IGameInfo {
  mode: string;
  field: IField;
  ball: Object3D;
  players: IPlayer[];
}

export interface IFrame {
  timestamp: number;
  players: IPlayer[];
  ball: Object3D;
  collisions: TCollision[];
}

/*================================ VALIDATION ==============================*/

function validateObject3D(obj: any): obj is Object3D {
  return (
    obj &&
    typeof obj.type === "number" &&
    (typeof obj.texture === "string" || obj.texture === undefined) &&
    typeof obj.width === "number" &&
    typeof obj.height === "number" &&
    typeof obj.depth === "number" &&
    obj.position &&
    typeof obj.position.x === "number" &&
    typeof obj.position.y === "number" &&
    typeof obj.position.z === "number" &&
    (obj.velocity === undefined ||
      (typeof obj.velocity.x === "number" &&
        typeof obj.velocity.y === "number" &&
        typeof obj.velocity.z === "number"))
  );
}

function validatePlayer(obj: any): obj is IPlayer {
  return (
    obj &&
    typeof obj.id === "string" &&
    typeof obj.team === "boolean" && // Updated to boolean
    validateObject3D(obj.paddle)
  );
}

function validateField(obj: any): obj is IField {
  // Updated to IField
  return (
    obj &&
    Array.isArray(obj.walls) &&
    obj.walls.every(validateObject3D) &&
    Array.isArray(obj.objects) &&
    obj.objects.every(validateObject3D) &&
    Array.isArray(obj.goals) &&
    obj.goals.every(validateObject3D)
  );
}

function validateGameInfo(obj: any): obj is IGameInfo {
  return (
    obj &&
    validateField(obj.field) &&
    validateObject3D(obj.ball) &&
    Array.isArray(obj.players) &&
    obj.players.every(validatePlayer)
  );
}

function validateCollision(obj: any): obj is TCollision {
  return (
    obj &&
    typeof obj.type === "number" &&
    obj.position &&
    typeof obj.position.x === "number" &&
    typeof obj.position.y === "number" &&
    typeof obj.position.z === "number" &&
    obj.direction &&
    typeof obj.direction.x === "number" &&
    typeof obj.direction.y === "number" &&
    typeof obj.direction.z === "number"
  );
}

function validateIFrame(obj: any): obj is IFrame {
  return (
    obj &&
    typeof obj.timestamp === "number" &&
    Array.isArray(obj.players) &&
    obj.players.every(validatePlayer) &&
    validateObject3D(obj.ball) &&
    Array.isArray(obj.collisions) &&
    obj.collisions.every(validateCollision)
  );
}

/*================================ PARSING ==============================*/

// export function parseGameData(json: string): IGameInfo | null {
//   const parsedData = JSON.parse(json);
//   if (validateGameInfo(parsedData)) {
//     return parsedData;
//   } else {
//     console.error("Invalid game data:", parsedData);
//     return null;
//   }
// }

// export function parseFrameData(json: string): IFrame | null {
//   const parsedData = JSON.parse(json);
//   if (validateIFrame(parsedData)) {
//     return parsedData;
//   } else {
//     console.error("Invalid frame data:", parsedData);
//     return null;
//   }
// }
