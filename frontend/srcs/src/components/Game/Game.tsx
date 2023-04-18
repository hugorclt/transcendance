import React, {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { PerspectiveCamera, OrthographicCamera } from "@react-three/drei";
import { LobbySocketContext } from "../../services/Lobby/LobbySocketContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Ball from "./Components/Ball";
import { Vector3 } from "three";
import Walls from "./Components/Walls";
import Paddles from "./Components/Paddles";
import CollisionDisk from "./Components/CollisionDisk/CollisionDisk";

function Game() {
  const socket = useContext(LobbySocketContext);
  const [gameInfo, setGameInfo] = useState<any>({});
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    socket?.on("game-info", (data) => {
      // console.log("gameInfoData :", data);
      setGameInfo(data);
      setIsLoading(false);
      socket?.emit("ready-to-play");
      // console.log("gameInfoData :", data);
    });
    return () => {
      socket?.off("game-info");
    };
  }, [socket]);

  useEffect(() => {
    socket?.emit("get-game-info");
  }, []);

  return (
    <Suspense fallback={null}>
      {isLoading ? (
        <></>
      ) : (
        <>
          {/* <OrthographicCamera
            makeDefault
            zoom={1}
            top={20}
            bottom={-20}
            left={20}
            right={-20}
            near={1}
            far={2000}
            position={[0, 30, 0]}
          /> */}
          {/* <PerspectiveCamera makeDefault position={[0, 30, 0]} fov={90} /> */}
          <Ball
            radius={gameInfo.ball._hitBox._width / 2}
            startPos={
              new Vector3(
                gameInfo.ball._initialPosition._x,
                gameInfo.ball._initialPosition._y,
                gameInfo.ball._initialPosition._z
              )
            }
          />
          <Walls walls={gameInfo.walls} />
          <Paddles players={gameInfo.players} />
          <CollisionDisk gameInfo={gameInfo} />
          <hemisphereLight args={["#ffff", 0.6]} />
        </>
      )}
    </Suspense>
  );
}

export default Game;
