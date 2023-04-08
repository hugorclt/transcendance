import { useContext, useEffect, useRef } from "react";
import { Mesh, Vector3 } from "three";
import { GameSocket } from "../../../services/Game/SocketContext";
import { MeshBasicMaterial } from "three/src/materials/MeshBasicMaterial";

interface TChargeCounter {
  charge: number;
}

const ChargeCounter = (props: TChargeCounter) => {
  const chargeCounterRef = useRef<Mesh>(null!);
  const socket = useContext(GameSocket);

  useEffect(() => {
    socket?.on("charge", (data) => {
      const scale = data.charge / 3;
      chargeCounterRef.current.scale.set(scale, 1, 1);
      if (data.charge === 0) {
        (chargeCounterRef.current.material as MeshBasicMaterial).visible = false;
      } else {
        (chargeCounterRef.current.material as MeshBasicMaterial).visible = true;
        if (data.charge === 3) {
          (chargeCounterRef.current.material as MeshBasicMaterial).color.set("red");
        } else {
          (chargeCounterRef.current.material as MeshBasicMaterial).color.set("blue");
        }
      }
    });
    return () => {
      socket?.off("charge");
    };
  }, [socket]);

  return (
    <group>
      <mesh ref={chargeCounterRef} position={new Vector3(-12, 0, 37)}>
        <boxGeometry args={[3, 0.5, 0.5]} /> {/* make the boxGeometry wider and flatter */}
        <meshBasicMaterial color="blue" transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

export default ChargeCounter;
