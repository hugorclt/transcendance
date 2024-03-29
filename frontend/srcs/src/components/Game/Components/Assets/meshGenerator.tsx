import { RepeatWrapping, Vector3 } from "three";
import { Object3D } from "./interfaces";
import { Grid, OrbitControls } from "@react-three/drei";
import { Mesh } from "three";
import { EType } from "../../../../shared/enum";
import { PerspectiveCamera } from "@react-three/drei";
import { Trail } from "@react-three/drei";
import { GridCustom } from "./custom/GridCustom";
import { Euler } from "three";
import { useTexture } from "@react-three/drei";
import useKeyboard from "../../../../hooks/useKeyboard";

const PADDLE_COLORS = {
  [EType.CLASSIC_PADDLE]: {
    color: "#ffffff",
    emissive: "white",
    emissiveIntensity: 4,
  },
  [EType.BASIC_PADDLE]: {
    color: "#ffffff",
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
    color: "white",
    emissive: "blue",
    emissiveIntensity: 10,
  },
};

export function createMeshComponent(
  object: Object3D,
  ref: React.RefObject<Mesh> | null,
  isActive: boolean | false
) {
  const keyMap = useKeyboard();
  const position = new Vector3(
    object.position.x,
    object.position.y,
    object.position.z
  );

  const materialProps: any = {};

  if (object.texture) {
    const texture = useTexture(object.texture);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(4, 4);

    materialProps.map = texture;
  }

  switch (object.type) {
    case EType.BASIC_PADDLE:
    case EType.CLASSIC_PADDLE:
    case EType.PADDLE:
    case EType.RED_PADDLE:
    case EType.ORANGE_PADDLE:
    case EType.PURPLE_PADDLE:
    case EType.GREEN_PADDLE:
    case EType.BLUE_PADDLE:
      const colorConfig = PADDLE_COLORS[object.type];

      return (
        <>
          {isActive && (
            <>
              <PerspectiveCamera
                makeDefault={true}
                position={[
                  position.x,
                  position.y + 5,
                  position.z > 0 ? position.z + 15 : position.z - 15,
                ]}
                fov={70}
              />
              <OrbitControls />
            </>
          )}
          <mesh ref={ref} position={position}>
            <boxGeometry args={[object.width, object.height, object.depth]} />
            <meshToonMaterial
              color={colorConfig.color}
              emissive={colorConfig.emissive}
              emissiveIntensity={colorConfig.emissiveIntensity}
              opacity={1}
              transparent={false}
              toneMapped={false}
            />
          </mesh>
        </>
      );

    /*================================ BALL ==============================*/

    case EType.SPHERE:
      if (!object.texture) {
        materialProps.color = "white";
        materialProps.emissive = "blue";
        materialProps.emissiveIntensity = 3;
        materialProps.toneMapped = false;
      } else {
        materialProps.map = useTexture("/moon.jpg");
        // materialProps.emissiveMap = useTexture('/laval.jpg');
        materialProps.roughness = 0;
        materialProps.metalness = 0;
        materialProps.toneMapped = false;
        materialProps.emissiveIntensity = 1;
      }

      if (isActive) {
        materialProps.color = "red";
        materialProps.emissive = "red";
        materialProps.emissiveIntensity = 10;
        materialProps.toneMapped = false;
      }

      const settings = {};
      const length = object.velocity?.z ? object.velocity.z / 10 + 1 : 1;

      return (
        <mesh ref={ref} position={position} args={[]} castShadow={true}>
          <sphereGeometry args={[object.width, 32, 16]} />
          <meshStandardMaterial {...materialProps} />
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
            // cellColor={"#FE7AF1"}
            cellColor={"#72FE18"}
          />
        </mesh>
      );

    case EType.BOX:
      if (!object.texture) {
        materialProps.color = "white";
      }
      return (
        <mesh position={position} receiveShadow={true}>
          <boxGeometry args={[object.width, object.height, object.depth]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
      );
    /*================================ END ==============================*/

    default:
      return null;
  }
}
