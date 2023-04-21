import { Vector3 } from "three";
import { Object3D } from "./interfaces";
import { Grid } from "@react-three/drei";
import { Mesh } from "three";
import { EType } from "../../../../shared/enum";

const PADDLE_COLORS = {
  [EType.RED_PADDLE]: { color: "#f69090", emissive: "red", emissiveIntensity: 4 },
  [EType.ORANGE_PADDLE]: { color: "#ff6a00", emissive: "#d9750b", emissiveIntensity: 4 },
  [EType.PURPLE_PADDLE]: { color: "#f1c5ff", emissive: "#bd0af4", emissiveIntensity: 4 },
  [EType.GREEN_PADDLE]: { color: "#21f40a", emissive: "#21f40a", emissiveIntensity: 4 },
  [EType.BLUE_PADDLE]: { color: "#0aaaf4", emissive: "#0aaaf4", emissiveIntensity: 4 },
};

function createMeshComponent(
  object: Object3D,
  ref: React.RefObject<Mesh> | null
) {
  const position = new Vector3(
    object.position.x,
    object.position.y,
    object.position.z
  );

  switch (object.type) {

    /*================================ PADDLE ==============================*/
    
    
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
            opacity={1}
            transparent
          />
        </mesh>
      );

    /*================================ BALL ==============================*/
    
    
    case EType.SPHERE:
      return (
        <mesh ref={ref} position={position}>
          <sphereGeometry args={[object.width, object.height, object.depth]} />
        </mesh>
      );

    /*================================ WALL ==============================*/
    
    
    case EType.WALL:
      return (
        <mesh position={position}>
          <Grid args={[object.width, object.height, object.depth]} />
        </mesh>
      );

    /*================================ END ==============================*/
    
    
    default:
      return null;
  }
}
