import React from "react";
import { Vector3 } from "three";
import { COLORS } from "../../../colors";
import Paddle from "./Paddle/Paddle";

function Paddles({ players }) {
  console.log("players", players);
  
  if (!players || players.length === 0) {
    return null; // Do not render anything if players data is not available
  }

  return (
    <>
      {players.map((player: any, index: any) => {
        return (
          <Paddle
            key={index}
            id={player.id}
            team={player.team}
            paddle={player.paddle}
          />
        );
      })}
    </>
  );
}

export default Paddles;
