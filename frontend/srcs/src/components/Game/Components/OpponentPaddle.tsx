import { useContext, useEffect, useRef } from "react";
import { Mesh, Vector3 } from "three";
import { GameSocket } from "../../../services/Game/SocketContext";

interface TPaddleProps {
  startPos: Vector3;
  width: number;
  length: number;
}

const OpponentPaddle = (props: TPaddleProps, ref: any) => {
  const paddleRef = useRef<Mesh>(null!);
  const socket = useContext(GameSocket);

  useEffect(() => {
    socket?.on("player2", (data) => {
      paddleRef.current.position.x = data.x
    })
    return () => {
      socket?.off("player2");
    }
  }, [socket])

  return (
    <mesh ref={paddleRef} position={props.startPos}>
      <boxGeometry args={[props.width, props.length, 1]} />
      <meshToonMaterial color={"#fff"} />
    </mesh>
  );
};

export default OpponentPaddle;
