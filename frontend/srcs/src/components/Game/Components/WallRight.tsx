import { Vector3, Euler } from "three";
import { Grid, GridProps } from "@react-three/drei";
import { GridRightWall } from "./GridZ";
import { useEffect, useRef, useState, useContext } from "react";
import { Mesh } from "three";
import { GameSocket } from "../../../services/Game/SocketContext";
import { useFrame } from "@react-three/fiber";
import { MdOpacity } from "react-icons/md";

interface TWallProps extends GridProps {
  position: Vector3;
  color: string;
  rotation?: Euler;
  visible: boolean;
  opacity: number;
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

const WallRight = (props: TWallProps) => {
  const { position, color, rotation, visible, ...gridProps } = props;
  const BallRef = useRef<Mesh>(null!);
  const [gameInfo, setGameInfo] = useState<GameInfo>(defaultValue);
  const [isWallVisible, setIsWallVisible] = useState(false);
  const socket = useContext(GameSocket);
  const [opacity, setOpacity] = useState(0);
  const [ballPosition, setBallPosition] = useState(new Vector3(0, 0, 0));


  useEffect(() => {
    socket?.on("game-info", (data) => {
        setGameInfo(data);
      });
    socket?.on("ball", (data) => {
      const BallRef = new Vector3(data.x, data.y, data.z);
      const wallXPosition = 16;
      const visibilityThreshold = 1;
      const opacity : number = isWallVisible ? 1 : 0;
      // setIsWallVisible(Math.abs(data.x - wallXPosition) < visibilityThreshold);
      setIsWallVisible(true);
      setOpacity(Math.abs(data.x - wallXPosition));
      setBallPosition(BallRef);

    });
    return () => {
      socket?.off("ball");
      socket?.off("game-info");
    };  
  }, [socket]);

  console.log("GridRightWall ballPosition:", ballPosition);
  return (
    <group position={[16, 50, 0]} rotation={[0, 0, 0]}>
      <GridRightWall visible={isWallVisible} ballPosition={ballPosition} {...gridProps} />
      <mesh>
      </mesh>
    </group>
  );
};

export default WallRight;
