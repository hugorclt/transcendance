import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils";

interface TPaddleProps {
  width: number;
  length: number;
}

const PaddleScene = (props: TPaddleProps) => {
  const paddleRef = useRef<Mesh>(null!);

  useFrame((_, delta) => {
    paddleRef.current.rotation.y += 0.03;
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={new Vector3(0, 10, 40)}/>
      <mesh
        ref={paddleRef}
        position={new Vector3(0, 0, 0)}
        rotation={[0, 0, degToRad(10)]}>
        <boxGeometry args={[props.width, props.length, 1]} />
        <meshToonMaterial
          emissive="#d9750b"
          emissiveIntensity={4}
          toneMapped={false}
          color={"#ff6a00"}
        />
      </mesh>
    </>
  );
};

export default PaddleScene;
