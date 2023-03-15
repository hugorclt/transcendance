import React from "react";
import PlayerCard from "./PlayerCard/PlayerCard";
import {
  BotContainer,
  CentralContainer,
  GamePlayersMode,
  GameStartButton,
  GameTitle,
  GameTitleCard,
  GameTitleContainer,
  InviteFriendButton,
  TeamBuilderContainer,
  TeamCardsContainer,
  TeamContainer,
  TeamName,
  TeamNbPlayers,
  TeamInfoContainer,
  TeamStatusContainer,
} from "./TeamBuilderStyle";

function TeamBuilder() {
  return (
    <TeamBuilderContainer>
      <GameTitleContainer>
        <GameTitleCard>
          <GameTitle>PONG CHAMPIONS</GameTitle>
          <GamePlayersMode>2 vs 2</GamePlayersMode>
        </GameTitleCard>
      </GameTitleContainer>
      <CentralContainer>
        <TeamContainer>
          <TeamInfoContainer>
            <TeamStatusContainer>
              <TeamName>RED TEAM</TeamName>
              <TeamNbPlayers>2/4</TeamNbPlayers>
            </TeamStatusContainer>
            <InviteFriendButton />
          </TeamInfoContainer>
          <TeamCardsContainer>
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
          </TeamCardsContainer>
        </TeamContainer>
        <TeamContainer>
          <TeamInfoContainer>
            <TeamStatusContainer>
              <TeamName>BLUE TEAM</TeamName>
              <TeamNbPlayers>2/4</TeamNbPlayers>
            </TeamStatusContainer>
            <InviteFriendButton />
          </TeamInfoContainer>
          <TeamCardsContainer>
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
          </TeamCardsContainer>
        </TeamContainer>
      </CentralContainer>
      <BotContainer>
        <GameStartButton>PLAY</GameStartButton>
      </BotContainer>
    </TeamBuilderContainer>
  );
}

export default TeamBuilder;
