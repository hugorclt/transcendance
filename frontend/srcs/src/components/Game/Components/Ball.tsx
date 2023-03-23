import { useFrame } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Mesh, Vector2, Vector3 } from "three";
import { useForwardRaycast } from "../../../hooks/useForwardRaycast";
import { MAP_SIZE, WALL_SIZE } from "../Game";

interface TBallProps {
  color: string;
  position: Vector3;
  radius: number;
}



const Ball = (props: TBallProps, ref: any) => {
  const ballRef = useRef<Mesh>(null!);

  useImperativeHandle(ref, () => ({
    getPosition() {
      return ballRef.current.position;
    },
    setXPosition(offset: number) {
      ballRef.current.position.x += offset;
    },
    setZPosition(offset: number) {
      ballRef.current.position.z += offset;
    }
  }));

  return (
    <mesh ref={ballRef} position={props.position}>
      <sphereGeometry args={[props.radius, 32, 32]} />
      <meshToonMaterial color={props.color} />
    </mesh>
  );
};


export default forwardRef(Ball);