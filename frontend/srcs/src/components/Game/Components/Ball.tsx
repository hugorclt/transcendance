import { useFrame } from "@react-three/fiber";
import { useContext, useEffect, useRef } from "react";
import { Mesh, Vector3 } from "three";
import { LobbySocketContext } from "../../../services/Lobby/LobbySocketContext";
import { Object3D } from "./Assets/interfaces";
import { createMeshComponent } from "./Assets/meshGenerator";
import { useState } from "react";

type BallProps = {
  ball: Object3D;
};

const Ball = (props: BallProps) => {
  const ballRef = useRef<Mesh>(null!);
  const socket = useContext(LobbySocketContext);
  var velocity;

  useFrame(({ clock }) => {
    if (ballRef.current) {
      ballRef.current.rotation.x += velocity.z / 100;
      ballRef.current.rotation.z += velocity.x / 100;
    }
  });

  useEffect(() => {
    socket?.on("frame", (data) => {
      console.log(data.ball.position);
      ballRef.current.position.x = data.ball.position.x;
      ballRef.current.position.y = data.ball.position.y;
      ballRef.current.position.z = data.ball.position.z;

      velocity = new Vector3(
        data.ball.velocity.x,
        data.ball.velocity.y,
        data.ball.velocity.z
      );
    });

    return () => {
      socket?.off("frame");
    };
  }, [socket]);

  return <>{createMeshComponent(props.ball, ballRef, false)}</>;
};

export default Ball;
