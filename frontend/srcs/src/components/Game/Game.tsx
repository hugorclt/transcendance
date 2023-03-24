import React, {
  KeyboardEvent,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { COLORS } from "../../colors";
import {
  createMaterialArray,
  degreeToRad,
} from "../../services/Game/utilsGame";
import { PerspectiveCamera, OrbitControls, Stats, SoftShadows } from "@react-three/drei";
import { AxesHelper, Vector3 } from "three";
import { nanoid } from "nanoid";
import { toonShaderMaterial } from "../../services/Game/shaders/shadersUtils";
import { GameSocket } from "../../services/Game/SocketContext";
import SkyBox from "./Components/SkyBox";
import Floor from "./Components/Floor";
import Ball from "./Components/Ball";
import Wall from "./Components/Wall";
import Paddle from "./Components/PlayerPaddle";
import PlayerPaddle from "./Components/PlayerPaddle";
import OpponentPaddle from "./Components/OpponentPaddle";
import {
  Bloom,
  EffectComposer,
  HueSaturation,
  Pixelation,
  TiltShift,
} from "@react-three/postprocessing";
import Particles from "./Components/Particles";

interface GameInfo {
  floorWidth: number;
  floorLength: number;
  ballRadius: number;
  paddleWidth: number;
  paddleLength: number;
  paddlePlayerStartX: number;
  paddlePlayerStartZ: number;
  paddleOppStartX: number;
  paddleOppStartZ: number;
  ballStartX: number;
  ballSTartZ: number;
  scorePlayer1: number;
  scorePlayer2: number;
}

const defaultValue = {
  floorWidth: 0,
  floorLength: 0,
  ballRadius: 0,
  paddleWidth: 0,
  paddleLength: 0,
  scorePlayer1: 0,
  scorePlayer2: 0,
  paddlePlayerStartX: 0,
  paddlePlayerStartZ: 0,
  paddleOppStartX: 0,
  paddleOppStartZ: 0,
  ballStartX: 0,
  ballSTartZ: 0,
};

function Game() {
  const socket = useContext(GameSocket);
  const [gameInfo, setGameInfo] = useState<GameInfo>(defaultValue);

  useEffect(() => {
    socket?.on("game-info", (data) => {
      setGameInfo(data);
    });
    return () => {
      socket?.off("game-info");
    };
  }, [socket]);

  useEffect(() => {
    socket?.emit("start-game");
  }, [])

  return (
    <Suspense fallback={null}>
      {/* <PerspectiveCamera makeDefault /> */}
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur luminanceThreshold={1} />
      </EffectComposer>
      <OrbitControls />
      <primitive object={new AxesHelper(10)} />
      <Floor width={gameInfo.floorWidth} length={gameInfo.floorLength} />
      <Ball
        radius={gameInfo.ballRadius}
        radius={1}
        startPos={new Vector3(gameInfo.ballStartX, 0, gameInfo.ballSTartZ)}
      />
      <PlayerPaddle
        width={gameInfo.paddleWidth}
        length={gameInfo.paddleLength}
        startPos={
          new Vector3(
            gameInfo.paddlePlayerStartX,
            0,
            gameInfo.paddlePlayerStartZ
          )
        }
      />
      <OpponentPaddle
        width={gameInfo.paddleWidth}
        length={gameInfo.paddleLength}
        startPos={
          new Vector3(gameInfo.paddleOppStartX, 0, gameInfo.paddleOppStartZ)
        }
      />
      <hemisphereLight args={["#ffff", 0.6]} />
      {/* <Particles /> */}
      {/* <ambientLight color="#fff" /> */}
      <SoftShadows />
      <Stats />
    </Suspense>
  );
}

export default Game;
