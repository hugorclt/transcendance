import React, { useState } from "react";
import TeamBuilderLayout from "../../layouts/LobbyLayout/TeamBuilderLayout/TeamBuilderLayout";
import { useAtom } from "jotai";
import { endGameAtom, lobbyAtom, userAtom } from "../../services/store";
import LobbyCreatorLayout from "../../layouts/LobbyLayout/LobbyCreatorLayout/LobbyCreatorLayout";
import LobbyCreatorProvider from "./LobbyCreatorProvider";
import Selector from "../../components/Lobby/Selector/Selector";
import { TEndGame } from "../../services/type";
import Popup from "reactjs-popup";
import { PopUpBox } from "../../components/SideBar/FriendsList/FriendsCards/FriendsCardsStyle";
import { EndGameStatInfoContainer } from "./LobbyPage.style";

function LobbyPage() {
  const [lobby, setLobby] = useAtom(lobbyAtom);

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
