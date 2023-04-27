import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";
import { COLORS } from "../../colors";
import Game from "./Game";
import MyEffects from "./Effects";
import Scoreboard from "./Scoreboard";

const GameScreen = () => {
  const screenRef = useRef<any>();

  return (
    <>
      <div
        style={{
          position: "absolute",
          zIndex: "10",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}>
        <Scoreboard />
      </div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas
          ref={screenRef}
          tabIndex={0}
          style={{ background: COLORS.background }}
          linear>
          <Game />
          <MyEffects />
        </Canvas>
      </div>
    </>
  );
};

export default GameScreen;
