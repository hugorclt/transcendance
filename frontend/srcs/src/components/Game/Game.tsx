import React, { Suspense, useContext, useEffect, useState } from "react";
import { LobbySocketContext } from "../../services/Lobby/LobbySocketContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Ball from "./Components/Ball";
import Walls from "./Components/Walls";
import Paddles from "./Components/Paddles";
import Skybox from "./Components/sceneComponents/Skybox";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import { endGameAtom, lobbyAtom, lobbyDefaultValue } from "../../services/store";

function Game() {
  const socket = useContext(LobbySocketContext);
  const [gameInfo, setGameInfo] = useState<any>({});
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const [currentUserId, setCurrentUserId] = useState("");
  const navigate = useNavigate();
  const [gameAtom, setEndGameAtom] = useAtom(endGameAtom);

  useEffect(() => {
    socket?.on("game-info", (data) => {
      setGameInfo(data);
      setIsLoading(false);
    });

    socket?.on("end-game", (data) => {
      setEndGameAtom(data);
      console.log('je vais a slash')
      setLobby(lobbyDefaultValue)
      navigate("/");
    });
    return () => {
      socket?.off("game-info");
      socket?.off("game-end");
    };
  }, [socket]);

  useEffect(() => {
    // console.log("gamedata :", gameInfo.ball);
  }, [gameInfo]);

  useEffect(() => {
    socket?.emit("get-game-info");
  }, []);

  return (
    <Suspense fallback={null}>
      {isLoading ? (
        <></>
      ) : (
        <>
          <Ball ball={gameInfo.ball} />
          <Walls walls={gameInfo.field.walls} />
          <Paddles players={gameInfo.players} />
          {/* <CollisionDisk gameInfo={gameInfo} /> */}
          {/* <hemisphereLight args={["#ffff", 0.6]} /> */}
        </>
      )}
      <Skybox />
    </Suspense>
  );
}

export default Game;
