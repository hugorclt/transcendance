import React, { useState } from "react";
import { LobbyContext } from "./LobbyContext";
import { LobbySocketProvider } from "./LobbySocketContext";
import LobbyLayout from "../../layouts/LobbyLayout/LobbyLayout";
import Lobby from "../../components/Lobby/Lobby";

function LobbyPage() {
  const [selectedMode, setSelectedMode] = useState<number>(0);

  return (
    <LobbySocketProvider>
      <LobbyContext.Provider value={{ selectedMode, setSelectedMode }}>
        <LobbyLayout>
          <Lobby />
        </LobbyLayout>
      </LobbyContext.Provider>
    </LobbySocketProvider>
  );
}

export default LobbyPage;
