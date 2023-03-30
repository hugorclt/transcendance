import { useFrame } from "@react-three/fiber";
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from "react";
import { Mesh, Vector3 } from "three";
import useKeyboard from "../../../hooks/useKeyboard";
import { GameSocket } from "../../../services/Game/SocketContext";

interface TPaddleProps {
  startPos: Vector3;
  width: number;
  length: number;
}

const PlayerPaddle = (props: TPaddleProps, ref: any) => {
  const paddleRef = useRef<Mesh>(null!);
  const keyMap = useKeyboard();
  const socket = useContext(GameSocket);

  useFrame((_, delta) => {
    keyMap['KeyA'] && socket?.emit("left-move")
    keyMap['KeyD'] && socket?.emit("right-move")
    keyMap['Space'] && socket?.emit("special-shot")
  })

  useEffect(() => {
    socket?.on("player1", (data) => {
      paddleRef.current.position.x = data.x
    })
    return () => {
      socket?.off("player1");
    }
  }, [socket])

  return (
    <mesh ref={paddleRef} position={props.startPos}>
      <boxGeometry args={[props.width, props.length, 1]} />
      <meshToonMaterial color={"#fff"} />
    </mesh>
  );
};

export default forwardRef(PlayerPaddle);
