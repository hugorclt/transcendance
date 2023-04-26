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

type BallProps = {
  ball: Object3D;
};

const Ball = (props: BallProps) => {
  const ballRef = useRef<Mesh>(null!);
  const socket = useContext(LobbySocketContext);

  useFrame(({ clock }) => {
    if (ballRef.current) {
      ballRef.current.rotation.x += 0.01;
      ballRef.current.rotation.y += 0.01;
      ballRef.current.rotation.z += 0.01;

    }
  });

  useEffect(() => {
    socket?.on("frame", (data) => {
      ballRef.current.position.x = data.ball.position.x;
      ballRef.current.position.y = data.ball.position.y;
      ballRef.current.position.z = data.ball.position.z;
    });

    return () => {
      socket?.off("frame");
    };
  }, [socket]);

  return <>{createMeshComponent(props.ball, ballRef, false)}</>;
};

export default Ball;
