import { Vector3, Euler } from "three";
import { Grid, GridProps } from "@react-three/drei";
import { GridLeftWall, GridRightWall } from "./GridZ";

interface TWallProps extends GridProps {
  position: Vector3;
  color: string;
  rotation?: Euler;
}

const WallLeft = (props: TWallProps) => {
    const { position, color, rotation, ...gridProps } = props;
    return (
      <group position={[-16, 0, 0]} rotation={[0, 0, Math.PI /2 ]}>
        <GridLeftWall {...gridProps} visible={true}/>
        <mesh />
      </group>
    );
  };
  
  export default WallLeft;
  