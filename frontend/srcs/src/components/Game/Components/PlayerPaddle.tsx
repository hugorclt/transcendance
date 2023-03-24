import { useFrame } from "@react-three/fiber";
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from "react";
import { Mesh, Vector3 } from "three";
import useKeyboard from "../../../hooks/useKeyboard";
import { GameSocket } from "../../../services/Game/SocketContext";

interface TPaddleProps {
  startPos: Vector3;
  width: number;
  height: number;
}

const PlayerPaddle = (props: TPaddleProps, ref: any) => {
  const paddleRef = useRef<Mesh>(null!);
  const keyMap = useKeyboard();
  const socket = useContext(GameSocket);

  useFrame((_, delta) => {
    keyMap['KeyA'] && socket?.emit("left")
    keyMap['KeyD'] && socket?.emit("right")
  })

  useEffect(() => {
    socket?.on("player", (data) => {
      paddleRef.current.position.x = data.x
    })
    return () => {
      socket?.off("player");
    }
  }, [socket])

  return (
    <mesh ref={paddleRef} position={props.startPos}>
      <boxGeometry args={[props.width, props.height, 1]} />
      <meshToonMaterial color={"#fff"} />
    </mesh>
  );
};

export default forwardRef(PlayerPaddle);
