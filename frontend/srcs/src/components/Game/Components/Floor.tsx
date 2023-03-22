import { degreeToRad } from "../../../services/Game/utilsGame";
import { MAP_SIZE } from "../Game";

interface TFloorProps {
    width: number,
    height: number,
    color: string
}

const Floor = (props: TFloorProps) => {
  return (
    <mesh rotation={[degreeToRad(-90), 0, 0]} position={[MAP_SIZE.width / 2, 0, MAP_SIZE.depth / 2 ]}>
      <planeGeometry args={[props.width, props.height]} />
      <meshToonMaterial color={props.color} />
    </mesh>
  );
};

export default Floor;
