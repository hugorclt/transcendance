import React from "react";
import { Vector3 } from "three";
import { COLORS } from "../../../colors";

function Paddles(props) {
  return (
    <>
      {props.players.map((player) => {
        return (
          <mesh
            position={
              new Vector3(
                player._paddle._initialPosition._x,
                player._paddle._initialPosition._y,
                player._paddle._initialPosition._z
              )
            }
          >
            <boxGeometry
              args={[
                player._paddle._hitBox._width,
                player._paddle._hitBox._height,
                player._paddle._hitBox._depth,
              ]}
            />
            <meshToonMaterial
              color={COLORS.white}
              emissive="white"
              emissiveIntensity={10}
              opacity={0.3}
              transparent
            />
          </mesh>
        );
      })}
    </>
  );
}

export default Paddles;
