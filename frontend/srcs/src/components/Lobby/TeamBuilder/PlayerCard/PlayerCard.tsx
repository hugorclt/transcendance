import React from "react";
import {
  PlayerCardAvatar,
  PlayerCardContainer,
  PlayerCardLeftBorder,
  PlayerCardName,
  PlayerCardStatus,
  PlayerInfoContainer,
} from "./PlayerCardStyle";

function PlayerCard() {
  return (
    <PlayerCardContainer>
      <PlayerCardLeftBorder />
      <PlayerInfoContainer>
        <PlayerCardAvatar />
        <PlayerCardName>NAME</PlayerCardName>
        <PlayerCardStatus>STATUS</PlayerCardStatus>
      </PlayerInfoContainer>
    </PlayerCardContainer>
  );
}

export default PlayerCard;
