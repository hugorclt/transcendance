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
import {
  PerspectiveCamera,
  OrbitControls,
  Stats,
  SoftShadows,
} from "@react-three/drei";
import { AxesHelper, Vector2, Vector3 } from "three";
import { nanoid } from "nanoid";
import { toonShaderMaterial } from "../../services/Game/shaders/shadersUtils";
import { GameSocket } from "../../services/Game/SocketContext";
import Floor from "./Components/Floor";
import Ball from "./Components/Ball";
import Wall from "./Components/WallRight";
import OpponentPaddle from "./Components/OpponentPaddle";
import Paddle from "./Components/PlayerPaddle";
import PlayerPaddle from "./Components/PlayerPaddle";
import {
  Bloom,
  EffectComposer,
  HueSaturation,
  Pixelation,
  TiltShift,
} from "@react-three/postprocessing";
import ChargeCounter from "./Components/Charge";
import Scoreboard from "./Components/Scoreboard";
import { Euler } from "three";
import WallRight from "./Components/WallRight";
import WallLeft from "./Components/WallLeft";
import FloorGrid from "./Components/Floor";

interface GameInfo {

}

const defaultValue = {

};

function Game() {
  const socket = useContext(GameSocket);
  const [gameInfo, setGameInfo] = useState<GameInfo>(defaultValue);

  useEffect(() => {
    socket?.on("game-info", (data) => {
      console.log(data);
      setGameInfo(data);
    });
    return () => {
      socket?.off("game-info");
    };
  }, [socket]);

  useEffect(() => {
    console.log("start-game sent");
    socket?.emit("start-game");
  }, []);

  return (
    <Suspense fallback={null}>
      <PerspectiveCamera makeDefault position={[0, 0, 0]}/>


    </Suspense>
  );
}

export default Game;
