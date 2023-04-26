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
import Scoreboard from "./Scoreboard";


const GameScreen = () => {
  const screenRef = useRef<any>();
  const downloadRef = useRef<any>();
  const [media, setMedia] = useState<any>();
  const [playerScore, setPlayerScore] = useState<any>(0);


  return (
    <>
      <div style={{position: "absolute", zIndex: "10", width: "100%", display: "flex", justifyContent: "center"}}>
        <Scoreboard team1Score={2} team2Score={7} />
      </div>
      <div style={{ width: "100vw", height: "100vh"}}>
        <Canvas
          ref={screenRef}
          tabIndex={0}
          style={{ background: COLORS.background }}
          linear
        >

          <Game />
          {/* <Skybox /> */}
          <MyEffects />
        </Canvas>
      </div>
    </>
  );
};

export default GameScreen;
