import React, { useContext, useEffect, useRef, useState } from "react";
import { Mesh } from "three";
import { LobbySocketContext } from "../../../../services/Lobby/LobbySocketContext";
import { useFrame } from "@react-three/fiber";
import useKeyboard from "../../../../hooks/useKeyboard";
import { useAtom } from "jotai";
import { userAtom } from "../../../../services/store";
import { Object3D } from "../Assets/interfaces";
import { createMeshComponent } from "../Assets/meshGenerator";

type PlayerProps = {
  id: string;
  team: boolean;
  paddle: Object3D;
  mode: string;
};

function Paddle(props: PlayerProps) {
  const socket = useContext(LobbySocketContext);
  const playerRef = useRef<Mesh>(null!);
  const keyMap = useKeyboard();
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  let side1: string, side2: string;

  if (user.id === props.id) {
    side1 = props.team ? "left-move" : "right-move";
    side2 = props.team ? "right-move" : "left-move";
  }

  if (props.mode !== "CLASSIC") {
    useFrame(() => {
      if (!keyMap["undefined"]) {
        keyMap["KeyA"] && socket?.emit(side1);
        keyMap["KeyD"] && socket?.emit(side2);
        keyMap["KeyW"] && socket?.emit("up-move");
        keyMap["KeyS"] && socket?.emit("down-move");

        keyMap["KeyR"] && socket?.emit("super");
      }
    });
  } else {
    useFrame(() => {
      keyMap["KeyW"] && socket?.emit("left-move");
      keyMap["KeyS"] && socket?.emit("right-move");
    });
  }

  useEffect(() => {
    socket?.on("frame", (data) => {
      if (data.collisions.length > 0) {
        console.log("collision: ", data.collisions);
      }
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

  return (
    <>
      {createMeshComponent(
        props.paddle,
        playerRef,
        props.mode === "CHAMPIONS" ? isActive : false
      )}
    </>
  );
}

export default Paddle;
