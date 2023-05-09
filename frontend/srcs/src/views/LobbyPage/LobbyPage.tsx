import React, { useState } from "react";
import TeamBuilderLayout from "../../layouts/LobbyLayout/TeamBuilderLayout/TeamBuilderLayout";
import { useAtom } from "jotai";
import { lobbyAtom } from "../../services/store";
import LobbyCreatorLayout from "../../layouts/LobbyLayout/LobbyCreatorLayout/LobbyCreatorLayout";
import LobbyCreatorProvider from "./LobbyCreatorProvider";
import Selector from "../../components/Lobby/Selector/Selector";
import MatchMakingLayout from "../../layouts/LobbyLayout/MatchMakingLayout/MatchMakingLayout";

function LobbyPage() {
  const [lobby, setLobby] = useAtom(lobbyAtom);

  if (lobby.state == "FULL" || lobby.state == "JOINABLE") {
    return <TeamBuilderLayout />;
  } else if (lobby.state == "SELECTION") {
    return <Selector />;
  } else if (lobby.state == "MATCHMAKING") {
    return <MatchMakingLayout />;
  } else {
    return (
      <LobbyCreatorProvider>
        <LobbyCreatorLayout />
      </LobbyCreatorProvider>
    );
  }
}

export default LobbyPage;
