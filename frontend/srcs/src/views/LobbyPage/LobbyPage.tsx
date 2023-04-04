import React from "react";
import LobbyLayout from "../../layouts/LobbyLayout/LobbyLayout";
import { LobbySocketProvider } from "../../services/Lobby/LobbySocketContext";
import LobbyProvider from "../MainPage/LobbyProvider";
import { useAtom } from "jotai";
import { userAtom } from "../../services/store";

function LobbyPage() {
  const [user, setUser] = useAtom(userAtom);

  return (
    <LobbySocketProvider>
      <LobbyProvider>
        {user.status == "LOBBY" ? <LobbyLayout /> : <h1>GAMEMODESELECTOR</h1>}
      </LobbyProvider>
    </LobbySocketProvider>
  );
}

export default LobbyPage;
