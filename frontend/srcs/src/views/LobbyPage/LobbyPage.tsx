import React from "react";
import TeamBuilderLayout from "../../layouts/LobbyLayout/TeamBuilderLayout/TeamBuilderLayout";
import { useAtom } from "jotai";
import { lobbyAtom, userAtom } from "../../services/store";
import LobbyCreatorLayout from "../../layouts/LobbyLayout/LobbyCreatorLayout/LobbyCreatorLayout";
import LobbyCreatorProvider from "./LobbyCreatorProvider";
import Selector from "../../components/Lobby/Selector/Selector";

function LobbyPage() {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const [user, setUser] = useAtom(userAtom);

  if (lobby.state == "FULL" || lobby.state == "JOINABLE") {
    return <TeamBuilderLayout />;
  } else if (lobby.state == "SELECTION") {
    return <Selector />;
  } else if (lobby.state == "MATCHMAKING") {
    return <h1>MATCHMAKING</h1>;
  } else {
    return (
      <LobbyCreatorProvider>
        <LobbyCreatorLayout />
      </LobbyCreatorProvider>
    );
  }
}

export default LobbyPage;
