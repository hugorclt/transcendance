import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import Random from 'canvas-sketch-util/random';
import { Mesh, Vector3 } from "three";


export function Sparks({ count, position }) {
  const mesh = useRef();
  const light = useRef();


  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Random.range(0, 0.1);
      const factor = Random.range(0, 1);
      const speed = Random.range(0.1, 0.1); // Increased speed
      const x = Random.range(-0.01, 0.01);
      const y = Random.range(-0.01, 0.01);
      const z = Random.range(-0.01, 0.01);

      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, index) => {
      let { factor, speed, x, y, z } = particle;

      // Update the particle time
      const t = (particle.time += speed);

      // Update the particle position based on the time
      dummy.position.set(
        x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );

      const s = Math.cos(t);
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      mesh.current.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      {/* <pointLight ref={light} distance={40} intensity={8} color="#ff6600" /> Updated light color */}
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronBufferGeometry args={[0.2, 0]} />
        <meshPhongMaterial color="#ff6600" emissive="#ff3300" emissiveIntensity={1} /> {/* Updated material color and added emissive properties */}
      </instancedMesh>
    </>
  );
}
