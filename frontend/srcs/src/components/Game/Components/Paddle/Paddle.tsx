import React, { useContext, useEffect, useRef, useState } from "react";
import { Mesh, Vector3 } from "three";
import { COLORS } from "../../../../colors";
import { LobbySocketContext } from "../../../../services/Lobby/LobbySocketContext";
import { useFrame } from "@react-three/fiber";
import useKeyboard from "../../../../hooks/useKeyboard";
import { PerspectiveCamera } from "@react-three/drei";
import { useAtom } from "jotai";
import { userAtom } from "../../../../services/store";
import { IPlayer, Object3D } from "../Assets/interfaces";
import { createMeshComponent } from "../Assets/meshGenerator";
import { useLayoutEffect } from "react";

type PlayerProps = {
  id: string;
  team: boolean;
  paddle: Object3D;
};

function Paddle(props: PlayerProps) {
  const socket = useContext(LobbySocketContext);
  const playerRef = useRef<Mesh>(null!);
  const keyMap = useKeyboard();
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useAtom(userAtom);

  useFrame(({ mouse }) => {
    keyMap["KeyA"] && socket?.emit("left-move");
    keyMap["KeyD"] && socket?.emit("right-move");
    keyMap["KeyW"] && socket?.emit("up-move");
    keyMap["KeyS"] && socket?.emit("down-move");
  });

  useEffect(() => {
    socket?.on("frame", (data) => {
      // console.log("paddle.props", props.paddle);
      // console.log('playerRef changed:', playerRef.current);

      if (user.id === props.id) setIsActive(true);
      data.players.forEach((player) => {
        if (player.id === props.id) {
          playerRef.current.position.x = player.paddle.position.x;
          playerRef.current.position.y = player.paddle.position.y;
          playerRef.current.position.z = player.paddle.position.z;
        }
      });
    });

    return () => {
      socket?.off("frame");
    };
  }, [socket]);

  return <>{createMeshComponent(props.paddle, playerRef, isActive)}</>;
}

export default Paddle;
