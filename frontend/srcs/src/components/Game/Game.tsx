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
import GameInfoCard from "../Lobby/TeamBuilder/GameInfoCard/GameInfoCard";
import Skybox from "./Components/sceneComponents/Skybox";

function Game() {
  const socket = useContext(LobbySocketContext);
  const [gameInfo, setGameInfo] = useState<any>({});
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    socket?.on("game-info", (data) => {
      setGameInfo(data);
      setIsLoading(false);
      socket?.emit("ready-to-play");
    });
    return () => {
      socket?.off("game-info");
    };
  }, [socket]);

  useEffect(() => {
    console.log("gamedata :", gameInfo.ball);

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
          <Ball ball={gameInfo.ball}/>
          <Walls walls={gameInfo.field.walls} />
          <Paddles players={gameInfo.players} />
          {/* <CollisionDisk gameInfo={gameInfo} /> */}
          {/* <hemisphereLight args={["#ffff", 0.6]} /> */}
        </>
      )}
      <Skybox/>
    </Suspense>
  );
}

export default Game;