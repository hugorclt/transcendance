import React, { useEffect, useRef } from "react";
import { OrbitControls, PerspectiveCamera, SoftShadows } from "@react-three/drei";
import PaddleScene from "./Components/sceneComponents/Paddle";
import { Camera, Vector3 } from "three";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

function Scene() {
    const ref = useRef<any>();

    useEffect(() => {
        ref.current!.lookAt(new Vector3(0, 0, 0))
    }, [])
  return (
    <>
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur luminanceThreshold={1} />
      </EffectComposer>
      <hemisphereLight args={["#ffff", 0.6]} />
      {/* <OrbitControls /> */}
      <PerspectiveCamera ref={ref} makeDefault fov={100} position={[0, 5, 15]} />
      <PaddleScene width={7} length={3} startPos={new Vector3(0, 0, 0)} />
      <SoftShadows />
    </>
  );
}

export default Scene;
