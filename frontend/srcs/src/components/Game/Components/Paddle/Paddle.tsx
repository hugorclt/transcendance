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
    keyMap["KeyA"] && socket?.emit("left-move");
    keyMap["KeyD"] && socket?.emit("right-move");
  });

  useEffect(() => {
    socket?.on("frame", (data) => {
      data.players.forEach((player) => {
        if (player._id == id) {
          playerRef.current.position.x = player._paddle._hitBox._position._x;
          playerRef.current.position.y = player._paddle._hitBox._position._y;
          playerRef.current.position.z = player._paddle._hitBox._position._z;
        }
      });
    });

    return () => {
      socket?.off("frame");
    };
  }, [socket]);

  return (
    <>
      <mesh ref={playerRef} position={position}>
        <boxGeometry args={[width, height, depth]} />
        <meshToonMaterial
          color={COLORS.secondary}
          emissive="red"
          emissiveIntensity={10}
          opacity={1}
          transparent
        />
      </mesh>
    </>
  );
}

export default Paddle;
