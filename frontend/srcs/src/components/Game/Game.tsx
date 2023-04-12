import React, { Suspense, useContext, useEffect, useState } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { LobbySocketContext } from "../../services/Lobby/LobbySocketContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Ball from "./Components/Ball";
import { Vector3 } from "three";
import Walls from "./Components/Walls";
import Paddles from "./Components/Paddles";

function Game() {
  const socket = useContext(LobbySocketContext);
  const [gameInfo, setGameInfo] = useState<any>({});
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    socket?.on("game-info", (data) => {
      console.log("game info received");
      console.log(data);
      setGameInfo((prev) => ({ ...prev, ...data }));
      setIsLoading(false);
    });
    return () => {
      socket?.off("game-info");
    };
  }, [socket]);

  useEffect(() => {
    console.log("asking for game info...");
    socket?.emit("get-game-info");
  }, []);

  return (
    <Suspense fallback={null}>
      {isLoading ? (
        <></>
      ) : (
        <>
          <PerspectiveCamera makeDefault position={[0, 0, 30]} fov={90} />
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
          <hemisphereLight args={["#ffff", 0.6]} />
        </>
      )}
    </Suspense>
  );
}

export default Game;
