import React from "react";
import { useState } from "react";
import GameModeCard from "./GameModeCard/GameModeCard";

function Lobby() {
  return (
    <div className="flex w-full h-full justify-around items-center">
      <GameModeCard />
      <GameModeCard />
      <GameModeCard />
    </div>
  );
}

export default Lobby;
