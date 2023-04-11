import React, { Suspense, useContext, useEffect, useState } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { LobbySocketContext } from "../../services/Lobby/LobbySocketContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Ball from "./Components/Ball";

function Game() {
  const socket = useContext(LobbySocketContext);
  const [gameInfo, setGameInfo] = useState<any>({});
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    socket?.on("game-info", (data) => {
      console.log("game info received");
      console.log(data);
      setGameInfo((prev) => ({ ...prev, ...data }));
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
      <PerspectiveCamera makeDefault position={[0, 0, 0]} />
      <Ball
        radius={gameInfo.ball._hitbox.width / 2}
        startPos={gameInfo.ball._initalPosition}
      />
    </Suspense>
  );
}

export default Game;
