import React from "react";
import TeamBuilder from "../../../components/Lobby/TeamBuilder/TeamBuilder";
import {
  ButtonsContainer,
  GameTitleContainer,
  SliderContainer,
  TeamBuilderContainer,
  TeamContainer,
  TeamsContainer,
} from "./TeamBuilderLayout.style";
import ChangeTeamButton from "../../../components/Lobby/TeamBuilder/ChangeTeamButton/ChangeTeamButton";

function TeamBuilderLayout() {
  // return <TeamBuilder />;
  return (
    <TeamBuilderContainer>
      <GameTitleContainer>
        <h3>GAME MODE</h3>
        <h4>2 vs 2</h4>
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
      <ButtonsContainer></ButtonsContainer>
    </TeamBuilderContainer>
  );
}

export default TeamBuilderLayout;
