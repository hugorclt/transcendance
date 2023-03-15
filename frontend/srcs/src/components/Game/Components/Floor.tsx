import { degreeToRad } from "../../../services/Game/utilsGame";

interface TFloorProps {
    width: number,
    height: number,
    color: string
}

const Floor = (props: TFloorProps) => {
  return (
    <mesh rotation={[degreeToRad(-90), 0, 0]}>
      <planeGeometry args={[props.width, props.height]} />
      <meshToonMaterial color={props.color} />
    </mesh>
  );
};

export default Floor;
