import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, Vector3 } from "three";
import useKeyboard from "../../../hooks/useKeyboard";

interface TPaddleProps {
  position: Vector3;
  width: number;
  height: number;
  depth: number;
  color: string;
}

const VELOCITY = 8;

const Paddle = (props: TPaddleProps) => {
  const paddleRef = useRef<Mesh>(null!);
  const keyMap = useKeyboard();

  useFrame((_, delta) => {
    keyMap['KeyA'] && (paddleRef.current.position.x -= 1 * (delta * VELOCITY))
    keyMap['KeyD'] && (paddleRef.current.position.x += 1 * (delta * VELOCITY))
  })

  return (
    <mesh ref={paddleRef} position={props.position}>
      <boxGeometry args={[props.width, props.height, props.depth]} />
      <meshToonMaterial color={props.color} />
    </mesh>
  );
};

export default Paddle;
