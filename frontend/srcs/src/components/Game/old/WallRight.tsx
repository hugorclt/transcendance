import { Vector3, Euler } from "three";
import { Grid, GridProps } from "@react-three/drei";
import { GridRightWall } from "./GridZ";

interface TWallProps extends GridProps {
  position: Vector3;
  color: string;
  rotation?: Euler;
}

const WallRight = (props: TWallProps) => {
  const { position, color, rotation, ...gridProps } = props;
  return (
    <group position={[16, 0, 0]} rotation={[0,0,0]}>
      <GridRightWall {...gridProps}/>
      <mesh>
      </mesh>
    </group>
  );
};

export default WallRight;