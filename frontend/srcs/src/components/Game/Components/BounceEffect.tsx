import { useContext, useEffect, useRef } from "react";
import { Mesh, Vector3 } from "three";
import { GameSocket } from "../../../services/Game/SocketContext";
import { MeshBasicMaterial } from "three/src/materials/MeshBasicMaterial";
import { useState } from "react";

interface TBouceEffect {
    active: false;
  }

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
    ballStartY: number;
    ballStartZ: number;
    scorePlayer1: number;
    scorePlayer2: number;
    chargePlayer1: number;
    velocityX: number;
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
    ballStartY: 0,
    ballStartZ: 0,
    chargePlayer1: 0,
    velocityX: 0,
  };

const BounceEffect = (props: TBouceEffect) => {
  const BallRef = useRef<Mesh>(null!);
  const [gameInfo, setGameInfo] = useState<GameInfo>(defaultValue);
  const [isWallVisible, setIsWallVisible] = useState(false);
  const socket = useContext(GameSocket);

  useEffect(() => {
    socket?.on("game-info", (data) => {
        setGameInfo(data);
      });
    socket?.on("ball", (data) => {
      const BallRef = new Vector3(data.x, data.y, data.z);
      const wallXPosition = 16;
      const visibilityThreshold = 1;
      setIsWallVisible(Math.abs(data.x - wallXPosition) < visibilityThreshold);

    });
    return () => {
      socket?.off("ball");
      socket?.off("game-info");
    };
  }, [socket]);

  return (
    <>
    </>
  );
};

export default BounceEffect;
