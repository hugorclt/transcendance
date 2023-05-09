import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

interface SkyboxProps {
  map: string;
}

function Skybox({map} : SkyboxProps) {
  const base = useLoader(THREE.TextureLoader, map);
  const sphereRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    sphereRef.current.rotation.y += 0.001;
  });

  return (
    <mesh
      ref={sphereRef}
      material={
        new THREE.MeshBasicMaterial({ map: base, side: THREE.BackSide })
      }
    >
      <sphereGeometry args={[200, 32, 32]} />
    </mesh>
  );
}

export default Skybox
