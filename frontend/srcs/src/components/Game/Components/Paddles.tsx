import React from "react";
import { Vector3 } from "three";
import { COLORS } from "../../../colors";
import Paddle from "./Paddle/Paddle";

function Paddles(props) {
  return (
    <>
      {props.players.map((player) => {
        return (
          <Paddle
            width={player._paddle._hitBox._width}
            height={player._paddle._hitBox._height}
            depth={player._paddle._hitBox._depth}
            position={
              new Vector3(
                player._paddle._initialPosition._x,
                player._paddle._initialPosition._y,
                player._paddle._initialPosition._z
              )
            }
          />
        );
      })}
    </>
  );
}

export default Paddles;
