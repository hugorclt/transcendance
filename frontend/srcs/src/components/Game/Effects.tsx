import { OrbitControls, SoftShadows, Stats } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import React from "react";

export function MyEffects() {
  return (
    <>
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur luminanceThreshold={1} />
      </EffectComposer>
      <OrbitControls enabled={false} />
      <SoftShadows />
      <hemisphereLight args={["#ffff", 0.6]} />
      {/* <Stats /> */}
    </>
  );
}

export default MyEffects;
