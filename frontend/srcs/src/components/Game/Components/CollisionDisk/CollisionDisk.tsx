import React, { useContext, useEffect, useRef } from "react";
import { LobbySocketContext } from "../../../../services/Lobby/LobbySocketContext";
import { Material, Mesh, MeshToonMaterial } from "three";

export type TPropsCollisionDisk = {
  gameInfo: any;
};

function CollisionDisk({ gameInfo }: TPropsCollisionDisk) {
  const socket = useContext(LobbySocketContext);
  const meshRef = useRef<Mesh>(null!);
  const matRef = useRef<MeshToonMaterial>(null!);

  useEffect(() => {
    socket?.on("collision", (data) => {
      meshRef.current.position.x = data.x;
      meshRef.current.position.y = data.y;
      meshRef.current.position.z = data.z;
      meshRef.current.scale.x = 1;
      meshRef.current.scale.y = 1;
      meshRef.current.scale.z = 1;
      const id = setInterval(() => {
        meshRef.current.scale.x += 0.1;
        meshRef.current.scale.y += 0.1;
        meshRef.current.scale.z += 0.1;
        matRef.current.opacity -= 0.1;
      }, 100);

      setTimeout(() => {
        clearInterval(id);
      }, 3000);
    });
    return () => {
      socket?.off("collision");
    };
  }, [socket]);

  return (
    <mesh ref={meshRef}>
      <circleGeometry args={[0]} />
      <meshToonMaterial ref={matRef} opacity={1} transparent={true} />
    </mesh>
  );
}

export default CollisionDisk;
