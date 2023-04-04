import { Vector3, Euler } from "three";
import { Grid, GridProps } from "@react-three/drei";

interface TWallProps extends GridProps {
  position: Vector3;
  color: string;
  rotation?: Euler;
}

const Wall = (props: TWallProps) => {
  const { position, color, rotation, ...gridProps } = props;
  return (
    <group position={position} rotation={[0,0,0]}>
      <Grid {...gridProps}/>
      <mesh>
      </mesh>
    </group>
  );
};

export default Wall;
