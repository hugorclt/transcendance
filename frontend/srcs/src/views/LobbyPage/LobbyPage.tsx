import React, { useState } from "react";
import { LobbySocketProvider } from "./LobbySocketContext";
import { LobbyProvider } from "./LobbyContext";
import LobbyLayout from "../../layouts/LobbyLayout/LobbyLayout";
import { useGlobal } from "../../services/Global/GlobalProvider";
import GameModeSelectorLayout from "../../layouts/GameModeSelectorLayout/GameModeSelectorLayout";

function LobbyPage() {
  const { status } = useGlobal();

  return (
    <LobbySocketProvider>
      <LobbyProvider>
        {status == "LOBBY" ? <LobbyLayout /> : <GameModeSelectorLayout />}
      </LobbyProvider>
    </LobbySocketProvider>
  );
}

export default LobbyPage;
