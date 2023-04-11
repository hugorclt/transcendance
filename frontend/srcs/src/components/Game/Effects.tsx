import { OrbitControls, SoftShadows, Stats } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import React from "react";

function Effects() {
  return (
    <>
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur luminanceThreshold={1} />
      </EffectComposer>
      <OrbitControls />
      <SoftShadows />
      <Stats />

    </>
  );
}

export default Effects;
