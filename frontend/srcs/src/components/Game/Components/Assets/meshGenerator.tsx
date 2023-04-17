import { Vector3 } from "three";
import { Object3D } from "./interfaces";
import { Grid } from "@react-three/drei";
import { COLORS } from "../../../../colors";
import { Mesh } from "three";

const PADDLE_COLORS = {
  red: { color: "#f69090", emissive: "red", emissiveIntensity: 4 },
  orange: { color: "#ff6a00", emissive: "#d9750b", emissiveIntensity: 4 },
  purple: { color: "#f1c5ff", emissive: "#bd0af4", emissiveIntensity: 4 },
  green: { color: "#21f40a", emissive: "#21f40a", emissiveIntensity: 4 },
  blue: { color: "#0aaaf4", emissive: "#0aaaf4", emissiveIntensity: 4 },
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
    case "BOX-PADDLE-RED":
    case "BOX-PADDLE-ORANGE":
    case "BOX-PADDLE-PURPLE":
    case "BOX-PADDLE-GREEN":
    case "BOX-PADDLE-BLUE":
      const colorKey = object.type.split("-")[2].toLowerCase();
      const colorConfig = PADDLE_COLORS[colorKey];

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
    case "SPHERE":
      return (
        <mesh ref={ref} position={position}>
          <sphereGeometry args={[object.width, object.height, object.depth]} />
        </mesh>
      );
    case "GRID":
      return (
        <mesh position={position}>
          <Grid args={[object.width, object.height, object.depth]} />
        </mesh>
      );
    default:
      return null;
  }
}
