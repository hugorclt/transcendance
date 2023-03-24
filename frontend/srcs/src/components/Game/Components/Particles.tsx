import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Points } from "three";

const Particles = () => {
  const points = useRef<any>(null);
  const count = 2000;
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      let x = (Math.random() - 0.5) * 2;
      let y = (Math.random() - 0.5) * 2;
      let z = (Math.random() - 0.5) * 2;
      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, [count]);

  useFrame((state) => {
    const { clock } = state;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      points.current!.geometry.attributes.position.array[i3] +=
        Math.sin(clock.elapsedTime + Math.random() * 10) * 0.01;
      points.current!.geometry.attributes.position.array[i3 + 1] +=
        Math.cos(clock.elapsedTime + Math.random() * 10) * 0.01;
      points.current!.geometry.attributes.position.array[i3 + 2] += 
        Math.sin(clock.elapsedTime + Math.random() * 10) * 0.01;
    }
    points.current!.geometry.attributes.position.needsUpdate = true;
  });
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#a3a3a3" size={0.015} sizeAttenuation />
    </points>
  );
};

export default Particles;
