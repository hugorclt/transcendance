import React, { Suspense, useContext, useEffect, useState } from "react";
import { LobbySocketContext } from "../../services/Lobby/LobbySocketContext";
import Ball from "./Components/Ball";
import Walls from "./Components/Walls";
import Paddles from "./Components/Paddles";
import Skybox from "./Components/sceneComponents/Skybox";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import {
  endGameAtom,
  lobbyAtom,
  lobbyDefaultValue,
  userAtom,
} from "../../services/store";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

function Game() {
  const socket = useContext(LobbySocketContext);
  const [gameInfo, setGameInfo] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const navigate = useNavigate();
  const [gameAtom, setEndGameAtom] = useAtom(endGameAtom);
  const [user, setUser] = useAtom(userAtom);
  const [isSpec, setIsSpec] = useState<boolean>(false);

  useEffect(() => {
    socket?.on("game-info", (data) => {
      console.log("received game info: ", data);
      setGameInfo(data);
      const check = data.players.some((player) => player.id == user.id);
      console.log("check: ", check);
      if (!check) {
        console.log("spectator mode");
        setIsSpec(true);
      }
      setIsLoading(false);
    });

    socket?.on("end-game", (data) => {
      setUser((prev) => {
        return {
          ...prev,
          exp: prev.exp + data.xp,
          balance: prev.balance + data.money,
        };
      });
      setEndGameAtom(data);
      setLobby(lobbyDefaultValue);
      navigate("/");
    });
    return () => {
      socket?.off("game-info");
      socket?.off("game-end");
    };
  }, [socket]);

  useEffect(() => {
    console.log("get-game-info");
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
          {isSpec && (
            <>
              <PerspectiveCamera position={[0, 10, 0]} />
              <OrbitControls />
            </>
          )}
        </>
      )}
      <Skybox />
    </Suspense>
  );
}

export default Game;
