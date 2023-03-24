import { useContext, useEffect, useRef } from "react";
import { Mesh, Vector3 } from "three";
import { GameSocket } from "../../../services/Game/SocketContext";

interface TPaddleProps {
  startPos: Vector3;
  width: number;
  height: number;
}

const OpponentPaddle = (props: TPaddleProps, ref: any) => {
  const paddleRef = useRef<Mesh>(null!);
  const socket = useContext(GameSocket);

  useEffect(() => {
    socket?.on("opponent", (data) => {
      paddleRef.current.position.x = data.x
    })
    return () => {
      socket?.off("opponent");
    }
  }, [socket])

  return (
    <mesh ref={paddleRef} position={props.startPos}>
      <boxGeometry args={[props.width, props.height, 1]} />
      <meshToonMaterial color={"#fff"} />
    </mesh>
  );
};

export default OpponentPaddle;
