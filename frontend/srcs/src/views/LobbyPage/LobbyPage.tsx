import React, { useState } from "react";
import { LobbySocketProvider } from "./LobbySocketContext";
import { LobbyProvider } from "./LobbyContext";
import LobbyLayout from "../../layouts/LobbyLayout/LobbyLayout";
import Lobby from "../../components/Lobby/Lobby";
import { useGlobal } from "../../services/Global/GlobalProvider";
import GameModeSelector from "../../components/Lobby/GameModeSelector/GameModeSelector";
import MediaQuery from "react-responsive/types/Component";

function LobbyPage() {
  const { status } = useGlobal();

  return (
    <LobbyProvider>
      <LobbyLayout>
        {status === "LOBBY" ? (
          <LobbySocketProvider>
            <Lobby />
          </LobbySocketProvider>
        ) : (

          <GameModeSelector />
        )}
      </LobbyLayout>
    </LobbyProvider>
  );
}

export default LobbyPage;
