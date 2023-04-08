import { Vector3, Euler } from "three";
import { Grid, GridProps } from "@react-three/drei";
import { GridFloor } from "./GridZ";

interface TWallProps extends GridProps {
  position: Vector3;
  color: string;
  rotation?: Euler;
}

const FloorGrid = (props: TWallProps) => {
  const { position, color, rotation, ...gridProps } = props;
  return (
    <group position={[0, -2, 0]} rotation={[0,0,0]}>
      <GridFloor {...gridProps}/>
      <mesh>
      </mesh>
    </group>
  );
};

export default FloorGrid;