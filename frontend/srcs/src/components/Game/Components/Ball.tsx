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
import { GameSocket } from "../../../services/Game/SocketContext";

interface TBallProps {
  radius: number;
  startPos: Vector3;
}

const Ball = (props: TBallProps) => {
  const ballRef = useRef<Mesh>(null!);
  const socket = useContext(GameSocket);

  useEffect(() => {
    socket?.on("ball", (data) => {
      // console.log("useEffectBall");
      // console.log(data);
      ballRef.current.position.x = data.x;
      ballRef.current.position.y = data.y;
      ballRef.current.position.z = data.z;
    });
    return () => {
      socket?.off("ball");
    };
  }, [socket]);



  return (
    <Trail
      width={2} // Width of the line
      color={"skyblue"} // Color of the line
      length={3} // Length of the line
      decay={1} // How fast the line fades away
      local={false} // Wether to use the target's world or local positions
      stride={0} // Min distance between previous and current point
      interval={1} // Number of frames to wait before next calculation
      target={undefined} // Optional target. This object will produce the trail.
      attenuation={(width) => width} // A function to define the width in each point along it.
    >
      <mesh ref={ballRef} position={props.startPos}>
        <sphereGeometry args={[props.radius, 32, 32]} />
        <meshToonMaterial
          emissive="blue"
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
    </Trail>
  );
};

export default Ball;
