import React, { useState } from "react";
import { LobbySocketProvider } from "./LobbySocketContext";
import { LobbyProvider } from "./LobbyContext";
import LobbyLayout from "../../layouts/LobbyLayout/LobbyLayout";
import Lobby from "../../components/Lobby/Lobby";
import { useGlobal } from "../../services/Global/GlobalProvider";
import GameModeSelector from "../../components/Lobby/GameModeSelector/GameModeSelector";

function LobbyPage() {
  const { status } = useGlobal();

  return (
    <LobbySocketProvider>
      <LobbyProvider>
        <LobbyLayout>
          {status === "LOBBY" ? <Lobby /> : <GameModeSelector />}
        </LobbyLayout>
      </LobbyProvider>
    </LobbySocketProvider>
  );
}

export default LobbyPage;
