import { Vector3 } from "three";

interface TBallProps {
    color: string,
    position: Vector3,
    radius: number
}

const Ball = (props : TBallProps) => {
  return (
    <mesh position={props.position}>
      <sphereGeometry args={[props.radius, 32, 32]} />
      <meshToonMaterial color={props.color} />
    </mesh>
  );
};

export default Ball;