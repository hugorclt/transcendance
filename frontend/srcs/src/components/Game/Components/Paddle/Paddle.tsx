import React, { useContext, useEffect, useRef, useState } from "react";
import { Mesh, Vector3 } from "three";
import { COLORS } from "../../../../colors";
import { LobbySocketContext } from "../../../../services/Lobby/LobbySocketContext";
import { useFrame } from "@react-three/fiber";
import useKeyboard from "../../../../hooks/useKeyboard";
import { PerspectiveCamera } from "@react-three/drei";
import { useAtom } from "jotai";
import { userAtom } from "../../../../services/store";

//just for fun function getRandomColor() {
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

type TPaddleProps = {
  id: string;
  width: number;
  height: number;
  depth: number;
  position: Vector3;
};

function Paddle({ id, width, height, depth, position }: TPaddleProps) {
  const socket = useContext(LobbySocketContext);
  const playerRef = useRef<Mesh>(null!);
  const keyMap = useKeyboard();
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  // const [color, setColor] = useState(getRandomColor());

  useFrame(({ mouse }) => {
    keyMap["KeyA"] && socket?.emit("left-move");
    keyMap["KeyD"] && socket?.emit("right-move");
    keyMap["KeyW"] && socket?.emit("up-move");
    keyMap["KeyS"] && socket?.emit("down-move");
  });

  useEffect(() => {
    socket?.on("frame", (data) => {
      if (user.id === id) setIsActive(true);

      data.players.forEach((player) => {
        if (player._id == id) {
          // setColor(getRandomColor());
          playerRef.current.position.x = player._paddle._hitBox._position._x;
          playerRef.current.position.y = player._paddle._hitBox._position._y;
          playerRef.current.position.z = player._paddle._hitBox._position._z;
        }
      });
    });

    return () => {
      socket?.off("frame");
    };
  }, [socket]);

  return (
    <>
      <mesh ref={playerRef} position={position}>
        <boxGeometry args={[width, height, depth]} />
        <meshToonMaterial
          color={COLORS.secondary}
          emissive={"red"}
          emissiveIntensity={10}
          opacity={1}
          transparent
        />
        {isActive && (
          <PerspectiveCamera makeDefault={true} position={position} fov={90} />
        )}
      </mesh>
    </>
  );
}

export default Paddle;
