import { Canvas } from "@react-three/fiber";
import React, { FC, useEffect, useRef, useState } from "react";
import { COLORS } from "../../colors";
import Game from "./Game";
import SeaMap from "./maps/SeaMap";

const GameScreen = () => {
  return (
    <Canvas
      tabIndex={0}
      camera={{position:[0,6,53]}}
      style={{ background: COLORS.background, height: "100vh" }}>
      <Game />
      <SeaMap />
    </Canvas>
  );
};

export default GameScreen;
