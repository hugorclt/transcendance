import React, { useState } from "react";
import GameModeCard from "./GameModeCard/GameModeCard";
import { useLobbyContext } from "../../../views/LobbyPage/LobbyContext";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import { useGlobal } from "../../../services/Global/GlobalProvider";
import {
  GameModeButton,
  GameModeButtonBody,
  GameModeCardsBody,
  GameModeContainer,
} from "./GamemodeSelectorStyle";
import { useAtom } from "jotai";
import { lobbyAtom } from "../../../services/store";

function GameModeSelector() {
  const [lobby, setLobby] = useAtom(lobbyAtom);
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
  const { status, setStatus } = useGlobal();

  const createLobby = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axiosPrivate
      .post("http://localhost:3000/lobbies", {
        nbPlayers: players,
        mode: selectedMode.toLocaleUpperCase(),
      })
      .then((response: AxiosResponse) => {
        console.log(JSON.stringify(response.data));
        setLobby({
          id: response.data.id,
          ownerId: response.data.ownerId,
          nbPlayers: +response.data.nbPlayers,
          mode: response.data.mode,
        });
        setSelectedMode("");
        setOnModeSelected(false);
        setPlayers(0);
        setStatus("LOBBY");
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
