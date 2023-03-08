import React from "react";
import { useState } from "react";
import { useLobbyContext } from "../../../../views/LobbyPage/LobbyContext";
import {
  GameModeButtonBody,
  GameModeCardsBody,
} from "../GamemodeSelectorStyle";
import {
  GameModeCardsBottom,
  GameModeCardsButton,
  GameModeCardsContainer,
  GameModeCardsGameTitle,
  GameModeCardsMain,
  GameModeCardsText,
  GameModeCardsTitleBox,
  GameModeCardsUpper,
} from "./GameModeCardStyle";

interface Props {
  mode: string;
  description: string;
}

function GameModeCard(props: Props) {
  const [onHover, setOnHover] = useState(false);
  const { setOnModeSelected, setSelectedMode, setPlayers } = useLobbyContext();
  const handle1v1Click = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOnModeSelected(true);
    setPlayers(2);
    setSelectedMode(props.mode);
  };
  const handle2v2Click = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOnModeSelected(true);
    setPlayers(4);
    setSelectedMode(props.mode);
  };

  return (
    <GameModeCardsContainer
      onMouseOver={() => setOnHover(true)}
      onMouseOut={() => setOnHover(false)}>
      <GameModeCardsUpper>
        <GameModeCardsTitleBox>{props.mode}</GameModeCardsTitleBox>
        {onHover && (
          <GameModeCardsMain>
            <GameModeCardsButton onClick={handle1v1Click}>
              1 vs 1
            </GameModeCardsButton>
            <GameModeCardsButton onClick={handle2v2Click}>
              2 vs 2
            </GameModeCardsButton>
          </GameModeCardsMain>
        )}
      </GameModeCardsUpper>
      {onHover && (
        <GameModeCardsBottom>
          <GameModeCardsGameTitle>
            {props.mode}
          </GameModeCardsGameTitle>
          <GameModeCardsText>{props.description}</GameModeCardsText>
        </GameModeCardsBottom>
      )}
    </GameModeCardsContainer>
  );
}

export default GameModeCard;
