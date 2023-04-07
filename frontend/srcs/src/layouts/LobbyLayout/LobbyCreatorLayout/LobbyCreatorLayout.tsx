import React from "react";
import { LobbyCreatorLayoutContainer } from "./LobbyCreatorLayout.style";
import LobbyCreator from "../../../components/Lobby/LobbyCreator/LobbyCreator";

function LobbyCreatorLayout() {
  return (
    <LobbyCreatorLayoutContainer>
      <LobbyCreator />
    </LobbyCreatorLayoutContainer>
  );
}

export default LobbyCreatorLayout;
