import { Canvas } from "@react-three/fiber";
import React, { FC, useEffect, useRef, useState } from "react";
import { COLORS } from "../../colors";
import Game from "./Game";
import { Effects, Stars } from "@react-three/drei";
import BlueFlame from "./effects/BlueFlame";
import { OrbitControls } from "@react-three/drei";
import PlayerPaddle from "./Components/PlayerPaddle";
import { Vector3 } from "three";
import Scene from "./Scene";
import MyEffects from "./Effects";
import Skybox from "./Components/sceneComponents/Skybox";

const GameScreen = () => {
  const screenRef = useRef<any>();
  const downloadRef = useRef<any>();

  // useEffect(() => {
  //   if (screenRef.current == undefined || screenRef.current == null) return;
  //   const stream = screenRef.current!.captureStream(60);
  //   const recordedChunks = [];
  //   const options = {
  //     mimeType: "video/webm",
  //   };
  //   const mediaRecorder = new MediaRecorder(stream, options);
  //   mediaRecorder.ondataavailable = handleDataAvailable;
  //   mediaRecorder.start();

  //   function handleDataAvailable(event: any) {
  //     if (event.data.size > 0) {
  //       recordedChunks.push(event.data);
  //     }
  //   }

  //   setTimeout((event) => {
  //     mediaRecorder.stop();
  //     const blob = new Blob(recordedChunks, {
  //       type: "video/webm",
  //     });
  //     var url = URL.createObjectURL(blob);
  //     downloadRef.current.href = url;
  //     downloadRef.current.download("paddle.webm");
  //   }, 9000);
  // }, [screenRef]);

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas
          ref={screenRef}
          tabIndex={0}
          style={{ background: COLORS.background }}>
          <Game />
          <Skybox />
          <Effects />
        </Canvas>
      </div>
    </>
  );
};

export default GameScreen;
