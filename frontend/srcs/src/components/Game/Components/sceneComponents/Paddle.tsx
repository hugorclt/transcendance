import { useFrame } from "@react-three/fiber";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { Mesh, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils";

interface TPaddleProps {
  startPos: Vector3;
  width: number;
  length: number;
}

const PaddleScene = (props: TPaddleProps, ref: any) => {
  const paddleRef = useRef<Mesh>(null!);

  useFrame((_, delta) => {
    paddleRef.current.rotation.y += 0.03;
  });

  return (
    <mesh
      ref={paddleRef}
      position={props.startPos}
      rotation={[0, 0, degToRad(10)]}>
      <boxGeometry args={[props.width, props.length, 1]} />
      <meshToonMaterial
        emissive="red"
        emissiveIntensity={3.5}
        toneMapped={false}
        color={"#f69090"}
      />
    </mesh>
  );
};

export default PaddleScene;
