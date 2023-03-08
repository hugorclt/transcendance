import React, { useState } from "react";
import GameModeCard from "./GameModeCard/GameModeCard";
import { useLobbyContext } from "../../../views/LobbyPage/LobbyContext";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import {
  GameModeButton,
  GameModeButtonBody,
  GameModeCardsBody,
  GameModeContainer,
} from "./GamemodeSelectorStyle";

function GameModeSelector() {
  const axiosPrivate = useAxiosPrivate();
  const [errMsg, setErrMsg] = useState<string>("");
  const {
    onModeSelected,
    selectedMode,
    players,
    setSelectedMode,
    setOnModeSelected,
    setPlayers,
  } = useLobbyContext();

  const createLobby = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axiosPrivate
      .post("http://localhost:3000/lobbies", {
        nbPlayers: players,
        mode: selectedMode.toLocaleUpperCase(),
      })
      .then((response: AxiosResponse) => {
        setSelectedMode("");
        setOnModeSelected(false);
        setPlayers(0);
        console.log(response.data);
      })
      .catch((error: AxiosError) => {
        if (error.response?.data) {
          setErrMsg(JSON.stringify(error.response.data?.message));
        }
      });
  };

  return (
    <GameModeContainer>
      <GameModeCardsBody>
        <GameModeCard
          mode="Classic"
          description="Le Pong originel, berceau du gaming"
        />
        <GameModeCard
          mode="Champions"
          description="Pong comme vous ne l'aviez jamais imagine"
        />
        <GameModeCard
          mode="Gravity"
          description="La gravite s'invite dans pong pour vous jouer des tours"
        />
      </GameModeCardsBody>
      <GameModeButtonBody>
        {onModeSelected && (
          <GameModeButton onClick={createLobby}>
            {selectedMode + (players == 2 ? " 1v1" : " 2v2")}
          </GameModeButton>
        )}
        {errMsg && <p className="text-red-500">{errMsg}</p>}
      </GameModeButtonBody>
    </GameModeContainer>
  );
}

export default GameModeSelector;
