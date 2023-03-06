import React, { useState } from "react";
import { LobbySocketProvider } from "./LobbySocketContext";
import { LobbyProvider } from "./LobbyContext";
import LobbyLayout from "../../layouts/LobbyLayout/LobbyLayout";
import Lobby from "../../components/Lobby/Lobby";
import { Navigate } from "react-router-dom";
import { useGameContext } from "../../services/Game/GameProvider";

function LobbyPage() {
  const { status } = useGameContext();

  return (
    <LobbySocketProvider>
      <LobbyProvider>
        <LobbyLayout>
          {status === "LOBBY" ?
          <Lobby /> : <GameModeSelector />}
        </LobbyLayout>
      </LobbyProvider>
    </LobbySocketProvider>
  );
}

export default LobbyPage;
