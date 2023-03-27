import React, { useEffect } from "react";
import PlayerCard from "./PlayerCard/PlayerCard";
import {
  BotContainer,
  CentralContainer,
  GamePlayersMode,
  GameStartButton,
  GameTitle,
  GameTitleCard,
  GameTitleContainer,
  TeamBuilderContainer,
  LobbyLeaveButton,
} from "./TeamBuilderStyle";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import { userAtom, lobbyAtom, friendAtom } from "../../../services/store";
import TeamCard from "./TeamCard/TeamCard";

function TeamBuilder() {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useAtom(userAtom);
  const [lobby, setLobby] = useAtom(lobbyAtom);

  const leaveLobby = (e: React.SyntheticEvent) => {
    console.log("Leave Button pressed");
    e.preventDefault();
    axiosPrivate
      .post("http://localhost:3000/lobbies/leave", {
        userId: user.id,
        lobbyId: lobby.id,
      })
      .then((response: AxiosResponse) => {
        //should set lobbyAtom to default / undefined
        //TODO
        console.log("success leaving lobby");
      })
      .catch((error: AxiosError) => {
        console.log(JSON.stringify(error?.response?.data));
      });
  };

  return (
    <TeamBuilderContainer>
      <GameTitleContainer>
        <GameTitleCard>
          <GameTitle>PONG CHAMPIONS</GameTitle>
          <GameTitle>{lobby.mode}</GameTitle>
          <GamePlayersMode>
            {lobby.nbPlayers / 2} vs {lobby.nbPlayers / 2}
          </GamePlayersMode>
        </GameTitleCard>
      </GameTitleContainer>
      <CentralContainer>
        <TeamCard team="LEFT" />
        <TeamCard team="RIGHT" />
      </CentralContainer>
      <BotContainer>
        <LobbyLeaveButton onClick={leaveLobby}>LEAVE</LobbyLeaveButton>
        <GameStartButton>PLAY</GameStartButton>
      </BotContainer>
    </TeamBuilderContainer>
  );
}

export default TeamBuilder;
