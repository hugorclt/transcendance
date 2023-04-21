import { EType } from "../../../../shared/enum";

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

export interface Player {
  id: string;
  team: string;
  paddle: Object3D;
}

export interface Field {
  walls: Object3D[];
  objects: Object3D[];
  goals: Object3D[];
}

export interface IGameInfo {
  field: Field;
  ball: Object3D;
  players: Player[];
}

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

function validatePlayer(obj: any): obj is Player {
  return (
    obj &&
    typeof obj.id === "string" &&
    typeof obj.team === "string" &&
    validateObject3D(obj.paddle)
  );
}

function validateField(obj: any): obj is Field {
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

export function parseGameData(json: string): IGameInfo | null {
  const parsedData = JSON.parse(json);
  if (validateGameInfo(parsedData)) {
    return parsedData;
  } else {
    console.error("Invalid game data:", parsedData);
    return null;
  }
}
