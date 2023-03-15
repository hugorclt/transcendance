import React, {
  KeyboardEvent,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import { COLORS } from "../../colors";
import {
  createMaterialArray,
  degreeToRad,
} from "../../services/Game/utilsGame";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { Vector3 } from "three";
import { nanoid } from "nanoid";
import { toonShaderMaterial } from "../../services/Game/shaders/shadersUtils";
import { GameSocket } from "../../services/Game/SocketContext";
import SkyBox from "./Components/SkyBox";
import Floor from "./Components/Floor";
import Ball from "./Components/Ball";
import Wall from "./Components/Wall";
import Paddle from "./Components/Paddle";

const MAP_SIZE = {
  width: 32,
  height: 64,
};

const WALL_SIZE = {
  width: 1,
  height: 0.5,
  depth: MAP_SIZE.height,
};

const PADDLE_SIZE = {
  width: 7,
  height: 1,
  depth: 2,
};

const CAMERA_POS = new Vector3(0, 13, 49);

function Game() {
  const socket = useContext(GameSocket);
  const [posP1, setPosP1] = useState<Vector3>(
    new Vector3(0, 0.5, MAP_SIZE.height / 2)
  );
  const [posP2, setPosP2] = useState<Vector3>(
    new Vector3(0, 0.5, -MAP_SIZE.height / 2)
  );
  const [posBall, setPosBall] = useState<Vector3>(
    new Vector3(0, 0.5, -MAP_SIZE.height / 2)
  );
  const [leftWall, setLeftWall] = useState<Vector3>(
    new Vector3(-MAP_SIZE.width / 2, WALL_SIZE.height / 2, 0)
  );
  const [rightWall, setRightWall] = useState<Vector3>(
    new Vector3(MAP_SIZE.width / 2, WALL_SIZE.height / 2, 0)
  );

  const handleKey = (e: KeyboardEvent) => {
    if (e.key == "a") {
      console.log("left");
    } else if (e.key == "d") {
      console.log("right");
    }
  };

  useEffect(() => {
    socket?.on("on-game-data", (data) => {});

    return () => {
      socket?.off("on-game-data");
    };
  }, [socket]);

  return (
    <Canvas
      tabIndex={0}
      style={{ background: COLORS.background, height: "100vh" }}
      onKeyDown={handleKey}>
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={CAMERA_POS} />
        <OrbitControls />
        <SkyBox />
        <Floor
          width={MAP_SIZE.width}
          height={MAP_SIZE.height}
          color="#000000"
        />
        <Ball color="#fff" radius={0.5} position={new Vector3(0, 0.5, 0)} />
        <Wall
          position={leftWall}
          width={WALL_SIZE.width}
          height={WALL_SIZE.height}
          depth={WALL_SIZE.depth}
          color={"#fff"}
        />
        <Wall
          position={rightWall}
          width={WALL_SIZE.width}
          height={WALL_SIZE.height}
          depth={WALL_SIZE.depth}
          color={"#fff"}
        />
        <Paddle
          position={posP1}
          width={PADDLE_SIZE.width}
          height={PADDLE_SIZE.height}
          depth={PADDLE_SIZE.depth}
          color={"#fff"}
        />
        <Paddle
          position={posP2}
          width={PADDLE_SIZE.width}
          height={PADDLE_SIZE.height}
          depth={PADDLE_SIZE.depth}
          color={"#fff"}
        />
        <hemisphereLight args={["#ffff", 0.6]} />\
        {/* <ambientLight color="#fff" /> */}
      </Suspense>
    </Canvas>
  );
}

export default Game;
