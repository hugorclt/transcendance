import { Canvas } from "@react-three/fiber";
import React, { FC, useEffect, useRef, useState } from "react";
import { COLORS } from "../../colors";
import Game from "./Game";

const GameScreen = () => {
  return (
    <Canvas
      tabIndex={0}
      style={{ background: COLORS.background, height: "100vh" }}>
      <Game />
    </Canvas>
  );
};

export default GameScreen;
