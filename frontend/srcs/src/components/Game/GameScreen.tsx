import { Canvas } from "@react-three/fiber";
import React, { FC, useEffect, useRef, useState } from "react";
import { COLORS } from "../../colors";
import Game from "./Game";
import { Stars } from "@react-three/drei";
import BlueFlame from "./effects/BlueFlame";
import { OrbitControls } from "@react-three/drei";
import PlayerPaddle from "./Components/PlayerPaddle";
import { Vector3 } from "three";
import Scene from "./Scene";

const GameScreen = () => {
  return (
    <Canvas
      tabIndex={0}
      camera={{ position: [0, 6.5, 53] }}
      style={{ background: COLORS.background, height: "100vh" }}>
      {/* <Game /> */}
      {/* <SeaMap /> */}
      {/* <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      /> */}
      <Scene />
    </Canvas>
  );
};

export default GameScreen;
