import React from "react";
import { GameModeSelectorLayoutContainer } from "./GameModeSelectorLayoutStyle";
import GameModeSelector from "../../components/Lobby/GameModeSelector/GameModeSelector";

function GameModeSelectorLayout() {
  return (
    <main>
      <GameModeSelectorLayoutContainer>
        <GameModeSelector />
      </GameModeSelectorLayoutContainer>
    </main>
  );
}

export default GameModeSelectorLayout;
