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
      console.log("colission received", data);
      meshRef.current.position.x = data.position._x;
      meshRef.current.position.y = data.position._y;
      meshRef.current.position.z = data.position._z;
      console.log(meshRef.current.geometry);
      meshRef.current.geometry;
      // meshRef.current.scale.y = 1;
      // meshRef.current.scale.z = 1;
      const id = setInterval(() => {
        console.log("colission animation loop");

        // meshRef.current.scale.x += 0.1;
        // meshRef.current.scale.y += 0.1;
        // meshRef.current.scale.z += 0.1;
        // meshRef.current.geometry.parameters.radius += 0.1;
        matRef.current.opacity -= 0.1;
      }, 100);

      setTimeout(() => {
        console.log("colission animation end");
        clearInterval(id);
        // meshRef.current.geometry.parameters.radius = ;
      }, 1000);
    });
    return () => {
      socket?.off("collision");
    };
  }, [socket]);

  return (
    <mesh ref={meshRef}>
      <circleGeometry args={[0]} />
      <meshToonMaterial
        color={"red"}
        ref={matRef}
        opacity={1}
        transparent={true}
      />
    </mesh>
  );
}

export default CollisionDisk;
