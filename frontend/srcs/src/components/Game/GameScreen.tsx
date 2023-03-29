import { Canvas } from "@react-three/fiber";
import React, { FC, useEffect, useRef, useState } from "react";
import { AxesHelper } from "three";
import { COLORS } from "../../colors";
import Game from "./Game";
import ProceduralMap from "./maps/ProceduralMap";
import SeaMap from "./maps/SeaMap";

const GameScreen = () => {
  return (
    <Canvas
      tabIndex={0}
      style={{ background: COLORS.background, height: "100vh" }}>
              <primitive object={new AxesHelper(10)} />
      {/* <Game /> */}
      {/* <SeaMap /> */}
      <ProceduralMap />
      {/* <Scene /> */}
    </Canvas>
  );
};

export default GameScreen;
