import React, { useState } from "react";
import GameModeCard from "./GameModeSelector/GameModeCard/GameModeCard";
import { useLobbyContext } from "../../views/LobbyPage/LobbyContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";

function Lobby() {
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
          setErrMsg(JSON.stringify(error.response.data.message));
        }
      });
  };

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="flex w-full h-5/6 justify-around items-center">
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
      </div>
      <div className="flex flex-col w-full h-1/6 justify-center items-center">
        {onModeSelected && (
          <button
            onClick={createLobby}
            className=" bg-dark-blue w-32 h-10 hover:bg-gold hover:text-dark-blue text-white rounded-full border-gold border-4"
          >
            {selectedMode + (players == 2 ? " 1v1" : " 2v2")}
          </button>
        )}
        {errMsg && <p className="text-red-500">{errMsg}</p>}
      </div>
    </div>
  );
}

export default Lobby;
