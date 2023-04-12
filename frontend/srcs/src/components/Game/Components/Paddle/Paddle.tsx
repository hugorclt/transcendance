import React, { useContext, useEffect, useRef } from "react";
import { Mesh, Vector3 } from "three";
import { COLORS } from "../../../../colors";
import { LobbySocketContext } from "../../../../services/Lobby/LobbySocketContext";
import { useFrame } from "@react-three/fiber";

type TPaddleProps = {
  width: number;
  height: number;
  depth: number;
  position: Vector3;
};

function Paddle({ width, height, depth, position }: TPaddleProps) {
  const socket = useContext(LobbySocketContext);
  const playerRef = useRef<Mesh>(null!);

  useFrame(({ mouse }) => {
    socket?.emit("mouse-move", { x: mouse.x, y: mouse.y });
  });

  useEffect(() => {
    socket?.on("on-move", (data) => {
      playerRef.current.position.x = data.x;
      playerRef.current.position.y = data.y;
    })

    return () => {
      socket?.off("on-move")
    }
  })

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
