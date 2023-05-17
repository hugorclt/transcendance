import React, { Suspense, useContext, useEffect, useState } from "react";
import { LobbySocketContext } from "../../services/Lobby/LobbySocketContext";
import Ball from "./Components/Ball";
import Walls from "./Components/Walls";
import Paddles from "./Components/Paddles";
import Skybox from "./Components/Skybox/Skybox";
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
      setGameInfo(data);
      const check = data.players.some((player) => player.id == user.id);
      if (!check) {
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
      socket?.off("end-game");
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
          <Ball ball={gameInfo.ball} />
          <Walls walls={gameInfo.field.walls} />
          <Paddles mode={gameInfo.mode} players={gameInfo.players} />
          {gameInfo.mode === "CLASSIC" && isSpec === false ? (
            <group rotation={[0, Math.PI / 2, 0]}>
              <>
                <PerspectiveCamera position={[0, 70, 0]} makeDefault={true} />
              </>
            </group>
          ) : (
            isSpec && (
              <>
                <PerspectiveCamera position={[0, 70, 0]} makeDefault={true} />
                <OrbitControls />
              </>
            )
          )}
          <Skybox map={gameInfo.field.skybox} />
        </>
      )}
    </Suspense>
  );
}

export default Game;
