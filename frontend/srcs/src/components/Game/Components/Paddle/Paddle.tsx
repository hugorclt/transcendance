import React, { useContext } from "react";
import { Vector3 } from "three";
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

  useFrame(({ mouse }) => {
    socket?.emit("mouse-move", { x: mouse.x, y: mouse.y });
  });

  return (
    <>
      <mesh position={position}>
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
