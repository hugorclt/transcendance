import React from "react";
import {
  ButtonsContainer,
  GameTitleContainer,
  SliderContainer,
  TeamBuilderContainer,
  TeamContainer,
  TeamsContainer,
} from "./TeamBuilderLayout.style";
import ChangeTeamButton from "../../../components/Lobby/TeamBuilder/ChangeTeamButton/ChangeTeamButton";
import GameInfoCard from "../../../components/Lobby/TeamBuilder/GameInfoCard/GameInfoCard";
import HeptaButton from "../../../components/common/Button/HeptaButton/HeptaButton";

function TeamBuilderLayout() {
  return (
    <TeamBuilderContainer>
      <GameTitleContainer>
        <GameInfoCard />
      </GameTitleContainer>
      <SliderContainer>
        <h4>MATCHMAKING</h4>
        <h4>PRIVATE</h4>
      </SliderContainer>
      <TeamsContainer>
        <TeamContainer></TeamContainer>
        <ChangeTeamButton />
        <TeamContainer></TeamContainer>
      </TeamsContainer>
      <ButtonsContainer>
        <HeptaButton text="PLAY" width={100} />
      </ButtonsContainer>
    </TeamBuilderContainer>
  );
}

export default TeamBuilderLayout;
