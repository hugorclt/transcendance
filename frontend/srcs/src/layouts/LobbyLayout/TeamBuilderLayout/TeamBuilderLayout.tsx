import React from "react";
import {
  ButtonsContainer,
  GameTitleContainer,
  SliderContainer,
  TeamBuilderContainer,
  TeamContainer,
  TeamsContainer,
} from "./TeamBuilderLayout.style";
import GameInfoCard from "../../../components/Lobby/TeamBuilder/GameInfoCard/GameInfoCard";
import PrivacyChanger from "../../../components/Lobby/TeamBuilder/PrivacyChanger/PrivacyChanger";
import TeamCard from "../../../components/Lobby/TeamBuilder/TeamCard/TeamCard";
import LeaveLobbyButton from "../../../components/Lobby/TeamBuilder/TeamBuilderButtons/LeaveLobbyButton/LeaveLobbyButton";
import ChangeTeamButton from "../../../components/Lobby/TeamBuilder/TeamBuilderButtons/ChangeTeamButton/ChangeTeamButton";
import ReadyButton from "../../../components/Lobby/TeamBuilder/TeamBuilderButtons/ReadyButton/ReadyButton";
import PlayButton from "../../../components/Lobby/TeamBuilder/TeamBuilderButtons/PlayButton/PlayButton";
import { useAtom } from "jotai";
import { lobbyAtom, userAtom } from "../../../services/store";

function TeamBuilderLayout() {
  const [user, setUser] = useAtom(userAtom);
  const [lobby, setLobby] = useAtom(lobbyAtom);

  return (
    <TeamBuilderContainer>
      <GameTitleContainer>
        <GameInfoCard />
      </GameTitleContainer>
      <SliderContainer>
        <PrivacyChanger />
      </SliderContainer>
      <TeamsContainer>
        <TeamContainer>
          <TeamCard team={false} />
        </TeamContainer>
        <ChangeTeamButton />
        <TeamContainer>
          <TeamCard team={true} />
        </TeamContainer>
      </TeamsContainer>
      <ButtonsContainer>
        {user.id == lobby.ownerId ? <PlayButton /> : <ReadyButton />}
        <LeaveLobbyButton />
      </ButtonsContainer>
    </TeamBuilderContainer>
  );
}

export default TeamBuilderLayout;
