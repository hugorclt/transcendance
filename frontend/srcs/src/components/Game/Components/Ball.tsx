import { useFrame } from "@react-three/fiber";
import { useContext, useEffect, useRef } from "react";
import { Mesh, Vector3 } from "three";
import { LobbySocketContext } from "../../../services/Lobby/LobbySocketContext";
import { Object3D } from "./Assets/interfaces";
import { createMeshComponent } from "./Assets/meshGenerator";
import { useState } from "react";
import { Trail } from "@react-three/drei";
import * as THREE from "three";
import { EType } from "../../../shared/enum";

type BallProps = {
  ball: Object3D;
};

const Ball = (props: BallProps) => {
  const ballRef = useRef<Mesh>(null!);
  const socket = useContext(LobbySocketContext);
  const [trail, setTrail] = useState(0xfffff);
  var velocity;

  useFrame(({ clock }) => {
    if (ballRef.current) {
      ballRef.current.rotation.x += velocity.z / 100;
      ballRef.current.rotation.z += velocity.x / 100;
    }
  });

  useEffect(() => {
    socket?.on("frame", (data) => {
      ballRef.current.position.x = data.ball.position.x;
      ballRef.current.position.y = data.ball.position.y;
      ballRef.current.position.z = data.ball.position.z;

      velocity = new Vector3(
        data.ball.velocity.x,
        data.ball.velocity.y,
        data.ball.velocity.z
      );
      if (data.ball.isNormal != undefined && data.ball.isNormal == false) {
        const playerPlusZ = data.players.find(
          (player) => player.paddle.position.z >= 0
        );
        const playerMinusZ = data.players.find(
          (player) => player.paddle.position.z <= 0
        );
        if (data.ball.position.z > 1) {
          if (playerPlusZ.paddle.type == EType.RED_PADDLE) setTrail(0xf69090);
          if (playerPlusZ.paddle.type == EType.ORANGE_PADDLE)
            setTrail(0xff6a00);
          if (playerPlusZ.paddle.type == EType.PURPLE_PADDLE)
            setTrail(0xbd0af4);
        } else {
          if (playerMinusZ.paddle.type == EType.RED_PADDLE) setTrail(0xf69090);
          if (playerMinusZ.paddle.type == EType.ORANGE_PADDLE)
            setTrail(0xff6a00);
          if (playerMinusZ.paddle.type == EType.PURPLE_PADDLE)
            setTrail(0xbd0af4);
        }
      } else {
        setTrail(0xfffff);
      }
    });

    return () => {
      socket?.off("frame");
    };
  }, [socket]);

  return (
    <>
      <Trail
        width={0.2} // Width of the line
        color={new THREE.Color(trail)} // Color of the line
        length={1} // Length of the line
        decay={1} // How fast the line fades away
        local={false} // Wether to use the target's world or local positions
        stride={0} // Min distance between previous and current point
        interval={1} // Number of frames to wait before next calculation
        target={undefined} // Optional target. This object will produce the trail.
        attenuation={(width) => width} // A function to define the width in each point along it.
      >
        {createMeshComponent(props.ball, ballRef, false)}
      </Trail>
    </>
  );
};

export default Ball;
