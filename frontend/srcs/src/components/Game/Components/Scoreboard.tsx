import { useContext, useEffect, useRef } from "react";
import { Mesh, Vector3 } from "three";
import { GameSocket } from "../../../services/Game/SocketContext";
import { MeshBasicMaterial } from "three/src/materials/MeshBasicMaterial";

interface TScoreboard {
  score1: number;
  score2: number;
}

const Scoreboard = (props: TScoreboard) => {
  const scoreboardRef = useRef<Mesh>(null!);
  const socket = useContext(GameSocket);

  useEffect(() => {
    socket?.on("score", (data) => {
        console.log(data);

    });
    return () => {
      socket?.off("score");
    };
  }, [socket]);

  return (
    <group>
      <mesh ref={scoreboardRef} position={new Vector3(0, 12, 40)}>
        <boxGeometry args={[8, 1, 1]} /> {/* make the boxGeometry wider and flatter */}
        <meshBasicMaterial color="grey" transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

export default Scoreboard;
