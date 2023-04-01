import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { FC, useEffect, useRef, useState } from "react";
import { AxesHelper } from "three";
import { COLORS } from "../../colors";
import Game from "./Game";
import Island from "./maps/Island";
import ProceduralMap from "./maps/ProceduralMap";
import SeaMap from "./maps/SeaMap";

const GameScreen = () => {
  return (
    <Canvas
      tabIndex={0}
      camera={{ position: [0, 6, 53] }}
      style={{ background: COLORS.background, height: "100vh" }}>
      {/* <primitive object={new AxesHelper(10)} /> */}
      <OrbitControls />
      {/* <Island /> */}
      {/* <hemisphereLight args={["#ffff", 0.6]} /> */}
      <Game />
      <SeaMap />
      {/* <ProceduralMap /> */}
      {/* <Scene /> */}
    </Canvas>
  );
};

export default GameScreen;
