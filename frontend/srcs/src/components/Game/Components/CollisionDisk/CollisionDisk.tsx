import React, { useContext, useEffect, useRef } from "react";
import { LobbySocketContext } from "../../../../services/Lobby/LobbySocketContext";
import { Material, Mesh, MeshToonMaterial } from "three";
import { degToRad } from "three/src/math/MathUtils";

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

      if (data.direction._z)
        return ;
      if (data.direction._x) {
        if (data.direction._x > 0) {
          meshRef.current.rotation.y = degToRad(90);
        } else {
          meshRef.current.rotation.y = degToRad(-90);
        }
      } else if (data.direction._y) {
        if (data.direction._y > 0) {
          // rotate - 90 x
          meshRef.current.rotation.x = degToRad(-90);
        } else {
          meshRef.current.rotation.x = degToRad(90);

          //rotation 90 x
        }
      }
      meshRef.current.scale.x = 0.5;
      meshRef.current.scale.y = 0.5;
      meshRef.current.scale.z = 0.5;
      const id = setInterval(() => {
        console.log("colission animation loop");

        meshRef.current.scale.x += 0.05;
        meshRef.current.scale.y += 0.05;
        meshRef.current.scale.z += 0.05;
        // meshRef.current.geometry.parameters.radius += 0.1;
        // matRef.current.opacity -= 0.1;
      }, 100);

      setTimeout(() => {
        console.log("colission animation end");
        meshRef.current.scale.x = 0;
        meshRef.current.scale.y = 0;
        meshRef.current.scale.z = 0;
        matRef.current.opacity = 0;
        meshRef.current.rotation.x = 0;
        meshRef.current.rotation.y = 0;
        meshRef.current.rotation.z = 0;
        clearInterval(id);
      }, 1000);
    });
    return () => {
      socket?.off("collision");
    };
  }, [socket]);

  return (
    <mesh ref={meshRef}>
      <circleGeometry args={[0.8]} />
      <meshToonMaterial
        color={"#ff0101"}
        ref={matRef}
        opacity={1}
        emissiveIntensity={0}
        toneMapped={false}
        transparent={false}
      />
    </mesh>
  );
}

export default CollisionDisk;
