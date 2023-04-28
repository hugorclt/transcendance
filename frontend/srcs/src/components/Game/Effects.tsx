import { OrbitControls, SoftShadows, Stats } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import React from "react";
import { SMAA } from "@react-three/postprocessing";

export function MyEffects() {
  return (
    <>
      <EffectComposer multisampling={0}>
        <Bloom
          mipmapBlur={true}
          // luminanceThreshold={0} 
          radius={3}
          levels={1}/>
        <SMAA />
      </EffectComposer>
      <OrbitControls enabled={false} />
      <hemisphereLight args={["#ffffff", 0.8]} />
      <directionalLight
          position={[5, 10, 5]}
          intensity={0.7}
          castShadow={true}
          // shadow-mapSize-width={512}
          // shadow-mapSize-height={512}
          // shadow-bias={1}
          // shadow-radius={5}
        />
        
      {/* <Stats /> */}
    </>
  );
}

export default MyEffects;
