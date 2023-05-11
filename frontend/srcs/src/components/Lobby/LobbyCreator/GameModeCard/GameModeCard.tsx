import React from "react";
import { useState } from "react";
import {
  GameModeCardsBottom,
  GameModeCardsButton,
  GameModeCardsContainer,
  GameModeCardsGameTitle,
  GameModeCardsMain,
  GameModeCardsText,
  GameModeCardsTitleBox,
  GameModeCardsUpper,
} from "./GameModeCard.style";
import { useLobbyCreatorContext } from "../../../../views/LobbyPage/LobbyCreatorProvider";

interface Props {
  mode: string;
  description: string;
  img: string;
  left: boolean
}

function GameModeCard(props: Props) {
  const { setOnModeSelected, setSelectedMode, setPlayers } =
    useLobbyCreatorContext();
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
    <GameModeCardsContainer style={{ backgroundImage: `url(${props.img})`, backgroundPosition: "center", backgroundSize: props.left ? "cover" : ""}}>
      <GameModeCardsUpper>
        <GameModeCardsMain>
          <GameModeCardsButton
            style={{ cursor: "pointer" }}
            onClick={handle1v1Click}>
            1 VS 1
          </GameModeCardsButton>
          <GameModeCardsButton
            style={{ cursor: "pointer" }}
            onClick={handle2v2Click}>
            2 VS 2
          </GameModeCardsButton>
        </GameModeCardsMain>
      </GameModeCardsUpper>
      <GameModeCardsBottom>
        <h3>{props.mode}</h3>
        <p>{props.description}</p>
      </GameModeCardsBottom>
    </GameModeCardsContainer>
  );
}

export default GameModeCard;
