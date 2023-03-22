import { Vector3 } from "three";

interface TWallProps {
  position: Vector3;
  width: number;
  height: number;
  depth: number;
  color: string;
}

const Wall = (props: TWallProps) => {
  return (
    <mesh position={props.position}>
      <boxGeometry args={[props.width, props.height, props.depth]} />
      <meshToonMaterial color={props.color} />
    </mesh>
  );
};

export default Wall;
