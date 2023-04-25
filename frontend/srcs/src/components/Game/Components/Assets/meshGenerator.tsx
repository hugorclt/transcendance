import { Vector3 } from "three";
import { Object3D } from "./interfaces";
import { Grid } from "@react-three/drei";
import { Mesh } from "three";
import { EType } from "../../../../shared/enum";
import { PerspectiveCamera } from "@react-three/drei";
import { Trail } from "@react-three/drei";
import { GridCustom } from "./custom/GridCustom";
import { Euler, TextureLoader } from "three";

const PADDLE_COLORS = {
  [EType.CLASSIC_PADDLE]: {
    color: "#fffff",
    emissive: "white",
    emissiveIntensity: 4,
  },

  [EType.RED_PADDLE]: {
    color: "#f69090",
    emissive: "red",
    emissiveIntensity: 4,
  },
  [EType.ORANGE_PADDLE]: {
    color: "#ff6a00",
    emissive: "#d9750b",
    emissiveIntensity: 4,
  },
  [EType.PURPLE_PADDLE]: {
    color: "#f1c5ff",
    emissive: "#bd0af4",
    emissiveIntensity: 4,
  },
  [EType.GREEN_PADDLE]: {
    color: "#21f40a",
    emissive: "#21f40a",
    emissiveIntensity: 4,
  },
  [EType.BLUE_PADDLE]: {
    color: "#0aaaf4",
    emissive: "#0aaaf4",
    emissiveIntensity: 4,
  },
};

export function createMeshComponent(
  object: Object3D,
  ref: React.RefObject<Mesh> | null,
  isActive: boolean | false
) {
  const position = new Vector3(
    object.position.x,
    object.position.y,
    object.position.z
  );

  const textureLoader = new TextureLoader();
  const materialProps: any = {};

  if (object.texture) {
    const texture = textureLoader.load(object.texture);
    materialProps.map = texture;
  }

  // console.log(object.type);

  switch (object.type) {
    /*================================ PADDLE ==============================*/

    case EType.CLASSIC_PADDLE:
    case EType.PADDLE:
    case EType.RED_PADDLE:
    case EType.ORANGE_PADDLE:
    case EType.PURPLE_PADDLE:
    case EType.GREEN_PADDLE:
    case EType.BLUE_PADDLE:
      const colorConfig = PADDLE_COLORS[object.type];

      return (
        <mesh ref={ref} position={position}>
          <boxGeometry args={[object.width, object.height, object.depth]} />
          <meshToonMaterial
            color={colorConfig.color}
            emissive={colorConfig.emissive}
            emissiveIntensity={colorConfig.emissiveIntensity}
            opacity={0.7}
            transparent={true}
          />
          {isActive && (
            <PerspectiveCamera
              makeDefault={true}
              position={position}
              fov={100}
            />
          )}
        </mesh>
      );

    /*================================ BALL ==============================*/

    case EType.SPHERE:
      return (
        <mesh ref={ref} position={position} args={[]}>
          <sphereGeometry args={[object.width, 32, 32]} />
          <meshToonMaterial
            emissive="blue"
            emissiveIntensity={10}
            toneMapped={false}
          />
        </mesh>
      );

    /*================================ WALL ==============================*/

    case EType.GRID:
      const rotation =
        object.width === 1 ? new Euler(0, 0, Math.PI / 2) : new Euler(0, 0, 0);
      const gridWidth = rotation.z === 0 ? object.width : object.height;
      const gridLength = object.depth;
      return (
        <mesh position={position}>
          <GridCustom
            gridWidth={gridWidth}
            gridLength={gridLength}
            rotation={rotation}
          />
        </mesh>
      );

    case EType.BOX:
      if (object.texture) {
        materialProps.color = "white";
      }
      return (
        <mesh position={position}>
          <boxGeometry args={[object.width, object.height, object.depth]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
      );
    /*================================ END ==============================*/

    default:
      return null;
  }
}
