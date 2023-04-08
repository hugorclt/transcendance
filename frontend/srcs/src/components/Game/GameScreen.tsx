import { Canvas } from "@react-three/fiber";
import React, { FC, useEffect, useRef, useState } from "react";
import { COLORS } from "../../colors";
import Game from "./Game";
import SeaMap from "./maps/SeaMap";
import { Stars } from "@react-three/drei";
import BlueFlame from "./effects/BlueFlame";

const GameScreen = () => {
  return (
    <Canvas
      tabIndex={0}
      camera={{position:[0,6.5,53]}}
      style={{ background: COLORS.background, height: "100vh" }}>
      <Game />
      {/* <SeaMap /> */}
            <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </Canvas>
  );
};

export default GameScreen;
