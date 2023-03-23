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
import { PerspectiveCamera, OrbitControls, Stats } from "@react-three/drei";
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

export const MAP_SIZE = {
  width: 32,
  height: 0,
  depth: 64,
};

export const WALL_SIZE = {
  width: 1,
  height: 0.5,
  depth: MAP_SIZE.depth,
};

const PADDLE_SIZE = {
  width: 7,
  height: 1,
  depth: 2,
};

type BallRefType = {
  getPosition: () => Vector3;
  setXPosition: (number: number) => {};
  setZPosition: (number: number) => {};
};

type PaddleRefType = {
  getPosition: () => Vector3;
  setXPosition: (number: number) => {};
};

const VELOCITY = 18;
const MASS = 1;
const PADDLEMASS = 0.1;

const CAMERA_POS = new Vector3(MAP_SIZE.width / 2, 10, MAP_SIZE.depth + 18);

function Game() {
  const socket = useContext(GameSocket);
  var vecSpeed = new Vector3(0, 0, 1);
  const canvas = useRef<HTMLDivElement>(null!);
  const playerPaddle = useRef<PaddleRefType>();
  const oppPaddle = useRef<PaddleRefType>();
  const ballRef = useRef<BallRefType>();

  const [posP1, setPosP1] = useState<Vector3>(
    new Vector3(MAP_SIZE.width / 2, 0.5, 0)
  );
  const [posP2, setPosP2] = useState<Vector3>(
    new Vector3(MAP_SIZE.width / 2, 0.5, MAP_SIZE.depth)
  );
  const [posBall, setPosBall] = useState<Vector3>(
    new Vector3(MAP_SIZE.width / 2, 1, MAP_SIZE.depth / 2)
  );
  const [leftWall, setLeftWall] = useState<Vector3>(
    new Vector3(0, WALL_SIZE.height / 2, WALL_SIZE.depth / 2)
  );
  const [rightWall, setRightWall] = useState<Vector3>(
    new Vector3(MAP_SIZE.width, WALL_SIZE.height / 2, WALL_SIZE.depth / 2)
  );

  function collideWithPaddle(paddle: PaddleRefType) {
    // Compute the impulse of the collision
    const dx = ballRef.current?.getPosition().x! - paddle.getPosition().x!;
    const dz = ballRef.current?.getPosition().z! - paddle.getPosition().z!;
    const dist = Math.sqrt(dx * dx + dz * dz);
    const normalX = dx / dist;
    const normalZ = dz / dist;
    const speed = Math.sqrt(vecSpeed.x * vecSpeed.x + vecSpeed.z * vecSpeed.z);
    const dot = vecSpeed.x * normalX + vecSpeed.z * normalZ;
    const angle = Math.atan2(normalZ, normalX);
    const elasticity = 1.2;
    const impulse = (2 * dot * MASS * PADDLEMASS) / (MASS + PADDLEMASS);

    // Update the velocity of the ball based on the impulse of the collision
    console.log(elasticity, speed, Math.sin(angle), impulse, normalZ);
    vecSpeed.x =
      elasticity * speed * Math.cos(angle) + (impulse * normalX) / MASS;
    vecSpeed.z =
      elasticity * speed * Math.sin(angle) + (impulse * normalZ) / MASS;
  }

  function collideWithPitch() {
    const radius = 0.5;
    const wallThickness = WALL_SIZE.width / 2;

    // Check for collision with left wall
    if (ballRef.current?.getPosition().x! - radius <= 0 + wallThickness) {
      // ref.current.position.x = 0 + radius;
      vecSpeed.x = -vecSpeed.x;
    }

    // Check for collision with right wall
    if (
      ballRef.current?.getPosition().x! + radius >=
      MAP_SIZE.width - wallThickness
    ) {
      // ref.current.position.x = MAP_SIZE.width - radius;
      vecSpeed.x = -vecSpeed.x;
    }
  }

  function isCollidedWithPaddle() {
    const radius = 0.5;
    const ball = ballRef.current?.getPosition()!;
    const playerPad = playerPaddle.current?.getPosition()!;
    const playerOpp = oppPaddle.current?.getPosition()!;
    
    if (ball.z - radius <= playerOpp.z + PADDLE_SIZE.depth /2  &&
    ball.x <= playerOpp.x + PADDLE_SIZE.width /2
    && ball.x >= playerOpp.x - PADDLE_SIZE.width /2 )
      return('opp');
    else if (ball.z + radius >= playerPad.z - PADDLE_SIZE.depth /2  &&
      ball.x <= playerPad.x + PADDLE_SIZE.width /2
      && ball.x  >= playerPad.x - PADDLE_SIZE.width /2 )
        return('player');
    return "none"
  }

  useFrame((state, delta) => {
    if (ballRef == undefined || ballRef.current == undefined) return;
    ballRef.current.setXPosition(vecSpeed.x * (delta * VELOCITY));
    ballRef.current.setZPosition(vecSpeed.z * (delta * VELOCITY));
    collideWithPitch();
    const collide = isCollidedWithPaddle();
    if (collide == "opp")
      collideWithPaddle(oppPaddle.current!);
    else if (collide == "player")
      collideWithPaddle(playerPaddle.current!);
  });

  return (
    <Suspense fallback={null}>
      <PerspectiveCamera makeDefault position={CAMERA_POS} />
      <OrbitControls target={[MAP_SIZE.width / 2, 1, MAP_SIZE.depth / 2]} />
      <primitive object={new AxesHelper(10)} />
      <SkyBox />
      <Floor width={MAP_SIZE.width} height={MAP_SIZE.depth} color="#000000" />
      <Ball ref={ballRef} color="#fff" radius={0.5} position={posBall} />
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
      <PlayerPaddle
        ref={playerPaddle}
        position={posP2}
        width={PADDLE_SIZE.width}
        height={PADDLE_SIZE.height}
        depth={PADDLE_SIZE.depth}
        color={"#fff"}
      />
      <OpponentPaddle
        ref={oppPaddle}
        position={posP1}
        width={PADDLE_SIZE.width}
        height={PADDLE_SIZE.height}
        depth={PADDLE_SIZE.depth}
        color={"#fff"}
      />
      {/* <hemisphereLight args={["#ffff", 0.6]} />\ */}
      <ambientLight color="#fff" />
      <Stats />
    </Suspense>
  );
}

export default Game;
