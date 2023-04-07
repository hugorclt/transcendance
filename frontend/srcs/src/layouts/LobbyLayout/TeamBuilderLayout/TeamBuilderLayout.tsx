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

function TeamBuilderLayout() {
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
        <ReadyButton />
        <LeaveLobbyButton />
      </ButtonsContainer>
    </TeamBuilderContainer>
  );
}

export default TeamBuilderLayout;
