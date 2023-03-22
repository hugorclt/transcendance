import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, Vector3 } from "three";
import { useForwardRaycast } from "../../../hooks/useForwardRaycast";

interface TBallProps {
  color: string;
  position: Vector3;
  radius: number;
}

const VELOCITY = 8;

const Ball = (props: TBallProps) => {
  const ref = useRef<Mesh>(null!);
  const raycast = useForwardRaycast(ref);
  var dir = 1;

  useFrame((state, delta) => {
    ref.current.position.z += dir * (delta * VELOCITY);
    const intersections = raycast();
    console.log(intersections[0]);
    if (intersections[0].distance <= 0.5) dir = -1;
  });

  return (
    <mesh ref={ref} position={props.position}>
      <sphereGeometry args={[props.radius, 32, 32]} />
      <meshToonMaterial color={props.color} />
    </mesh>
  );
};

export default Ball;
