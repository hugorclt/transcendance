import { Trail } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Bloom } from "@react-three/postprocessing";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { Mesh, Vector2, Vector3 } from "three";
import { useForwardRaycast } from "../../../hooks/useForwardRaycast";
import BlueFlame from "../effects/BlueFlame";
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
  const lastReceivedVelocity = useRef<Vector3>(new Vector3(0, 0, 0));
  const [velocity, setVelocity] = useState<Vector3>(new Vector3(0, 0, 0));

  useFrame(({ clock }) => {
    if (ballRef.current) {
      ballRef.current.rotation.x += velocity.z / 10;
      ballRef.current.rotation.z += velocity.x / 10;

    }
  });

  useEffect(() => {
    socket?.on("frame", (data) => {
      ballRef.current.position.x = data.ball.position.x;
      ballRef.current.position.y = data.ball.position.y;
      ballRef.current.position.z = data.ball.position.z;

      const newVelocity = new Vector3(data.ball.velocity.x, data.ball.velocity.y, data.ball.velocity.z);

      if (!lastReceivedVelocity.current.equals(newVelocity)) {
        setVelocity(newVelocity);
        lastReceivedVelocity.current.copy(newVelocity);
      }
    });

    return () => {
      socket?.off("frame");
    };
  }, [socket]);

  return <>{createMeshComponent(props.ball, ballRef, false)}</>;
};

export default Ball;
