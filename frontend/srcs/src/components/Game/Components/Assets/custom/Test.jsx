import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Particles() {
  const particlesRef = useRef();
  const dummy = new THREE.Object3D();

  const particles = new Array(500).fill().map(() => ({
    position: new THREE.Vector3(
      Math.random() * 12 - 6,
      Math.random() * 4,
      Math.random() * 12 - 6
    ),
    velocity: new THREE.Vector3(
      Math.random() * 0.02 - 0.01,
      Math.random() * 0.05,
      Math.random() * 0.02 - 0.01
    ),
    acceleration: new THREE.Vector3(0, -0.01, 0),
    life: Math.random() * 2 + 2,
    elapsedTime: 0
  }));

  useFrame((_, delta) => {
    particles.forEach((particle, i) => {
      particle.elapsedTime += delta;
      if (particle.elapsedTime > particle.life) {
        particle.elapsedTime = 0;
        particle.position.set(
          Math.random() * 12 - 6,
          Math.random() * 4,
          Math.random() * 12 - 6
        );
      }
      particle.velocity.addScaledVector(particle.acceleration, delta);
      particle.position.addScaledVector(particle.velocity, delta);
      dummy.position.copy(particle.position);
      dummy.updateMatrix();
      particlesRef.current.setMatrixAt(i, dummy.matrix);
    });
    particlesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={particlesRef} args={[null, null, particles.length]}>
      <sphereBufferGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color={0x0029ff} transparent opacity={0.8} />
    </instancedMesh>
  );
}
