import { Canvas } from "@react-three/fiber";
import React, { FC, useEffect, useRef, useState } from "react";
import { COLORS } from "../../colors";
import Game from "./Game";
import { Effects, Stars } from "@react-three/drei";
import BlueFlame from "./effects/BlueFlame";
import { OrbitControls } from "@react-three/drei";
import { Vector3 } from "three";
import Scene from "./Scene";
import MyEffects from "./Effects";
import Skybox from "./Components/sceneComponents/Skybox";
import PaddleScene from "./Components/sceneComponents/Paddle";

// NE PAS SUPPRIMER LE CODE EN COMMENTAIRE

const GameScreen = () => {
  const screenRef = useRef<any>();
  const downloadRef = useRef<any>();
  const [media, setMedia] = useState<any>();

  // const start = async () => {
  //   let stream = await navigator.mediaDevices.getDisplayMedia({
  //     video: true,
  //   });

  //   //needed for better browser support
  //   const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
  //     ? "video/webm; codecs=vp9"
  //     : "video/webm";
  //   let mediaRecorder = new MediaRecorder(stream, {
  //     mimeType: mime,
  //   });

  //   setMedia(mediaRecorder);

  //   let chunks: any = [];
  //   mediaRecorder.ondataavailable = (event) => {
  //     console.log("oui");
  //     chunks.push(event.data);
  //   };

  //   mediaRecorder.start();

  //   setTimeout(() => {
  //     mediaRecorder.stop();
  //     setTimeout(() => {
  //       let blob = new Blob(chunks, {
  //         type: chunks[0].type,
  //       });
  //       console.log(blob);
  //       downloadRef.current.href = URL.createObjectURL(blob);
  //       downloadRef.current.download = "video.webm";
  //     }, 2000);
  //   }, 10000);
  // };

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        {/* <button style={{ color: "white" }} onClick={start}>
          start
        </button>
        <a style={{ color: "white" }} ref={downloadRef}>
          download
        </a> */}
        <Canvas
          ref={screenRef}
          tabIndex={0}
          style={{ background: COLORS.background }}
          linear>
          {/* <Game /> */}
          {/* <Skybox /> */}
          <MyEffects />
          <PaddleScene width={10} length={3} />
        </Canvas>
      </div>
    </>
  );
};

export default GameScreen;
