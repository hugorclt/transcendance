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
import PrivacyChanger from "../../../components/Lobby/TeamBuilder/PrivacyChanger/PrivacyChanger";
import TeamCard from "../../../components/Lobby/TeamBuilder/TeamCard/TeamCard";

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
        <HeptaButton text="PLAY" width={100} />
      </ButtonsContainer>
    </TeamBuilderContainer>
  );
}

export default TeamBuilderLayout;
