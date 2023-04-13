import React, { useContext, useEffect, useRef } from "react";
import { Mesh, Vector3 } from "three";
import { COLORS } from "../../../../colors";
import { LobbySocketContext } from "../../../../services/Lobby/LobbySocketContext";
import { useFrame } from "@react-three/fiber";
import useKeyboard from "../../../../hooks/useKeyboard";

type TPaddleProps = {
  id: string;
  width: number;
  height: number;
  depth: number;
  position: Vector3;
};

function Paddle({ id, width, height, depth, position }: TPaddleProps) {
  const socket = useContext(LobbySocketContext);
  const playerRef = useRef<Mesh>(null!);
  const keyMap = useKeyboard();

  useFrame(({ mouse }) => {
    // socket?.emit("mouse-move", { x: mouse.x, y: mouse.y });
    keyMap["KeyA"] && socket?.emit("left-move");
    keyMap["KeyD"] && socket?.emit("right-move");
  });

  useEffect(() => {
    // socket?.on("on-move", (data) => {
    //   playerRef.current.position.x = data.x;
    //   playerRef.current.position.y = data.y;
    // });
    socket?.on("player-update", (data) => {
      console.log(data);
      if (data.player._id == id) {
        playerRef.current.position.x = data.player._paddle._hitBox._position._x;
        playerRef.current.position.y = data.player._paddle._hitBox._position._y;
        playerRef.current.position.z = data.player._paddle._hitBox._position._z;
      }
    });

    return () => {
      socket?.off("on-move");
      socket?.off("player-update");
    };
  }, [socket]);

  return (
    <>
      <mesh ref={playerRef} position={position}>
        <boxGeometry args={[width, height, depth]} />
        <meshToonMaterial
          color={COLORS.white}
          emissive="white"
          emissiveIntensity={10}
          opacity={0.3}
          transparent
        />
      </mesh>
    </>
  );
}

export default Paddle;
