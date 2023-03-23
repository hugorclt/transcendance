import { useFrame } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef } from "react";
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
export const PADDLEMASS = 0.1;

const OpponentPaddle = (props: TPaddleProps, ref: any) => {
  const paddleRef = useRef<Mesh>(null!);
  const keyMap = useKeyboard();

  useImperativeHandle(ref, () => ({
    getPosition() {
      return paddleRef.current.position;
    },
    setXPosition(offset: number) {
      paddleRef.current.position.x += offset;
    },
  }));

  useFrame((_, delta) => {
    keyMap["ArrowLeft"] && (paddleRef.current.position.x -= 1 * (delta * VELOCITY));
    keyMap["ArrowRight"] && (paddleRef.current.position.x += 1 * (delta * VELOCITY));
  });
  return (
    <mesh ref={paddleRef} position={props.position}>
      <boxGeometry args={[props.width, props.height, props.depth]} />
      <meshToonMaterial color={props.color} />
    </mesh>
  );
};

export default forwardRef(OpponentPaddle);
