import { OrbitControls } from "@react-three/drei";
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

      <hemisphereLight args={["#ffff", 0.6]} />
    </>
  );
}

export default Effects;
