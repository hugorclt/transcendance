import React from "react";
import {
  BotContainer,
  CentralContainer,
  GameStartButton,
  GameTitleCard,
  GameTitleContainer,
  LobbyLeaveButton,
} from "./TeamBuilderStyle";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import { userAtom, lobbyAtom, friendAtom } from "../../../services/store";
import TeamCard from "./TeamCard/TeamCard";
import ChangeTeamButton from "./ChangeTeamButton/ChangeTeamButton";
import ChangePrivacyButton from "./ChangePrivacyButton/ChangePrivacyButton";

function TeamBuilder() {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useAtom(userAtom);
  const [lobby, setLobby] = useAtom(lobbyAtom);

  const leaveLobby = (e: React.SyntheticEvent) => {
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

  const changeReady = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axiosPrivate
      .get(`lobbies/${lobby.id}/changeReady`)
      .then((response: AxiosResponse) => {
        console.log("changed ready status: ", JSON.stringify(response.data));
      })
      .catch((error: AxiosError) => {
        console.log(
          "error changing ready status: ",
          JSON.stringify(error.message)
        );
      });
  };

  return (
    <>
      <GameTitleContainer>
        <GameTitleCard>
          <h1>PONG CHAMPIONS</h1>
          <h1>{lobby.mode}</h1>
          <h3>
            {lobby.nbPlayers / 2} vs {lobby.nbPlayers / 2}
          </h3>
        </GameTitleCard>
      </GameTitleContainer>
      <CentralContainer>
        <TeamCard team={false} />
        <ChangeTeamButton />
        <ChangePrivacyButton />
        <TeamCard team={true} />
      </CentralContainer>
      <BotContainer>
        <LobbyLeaveButton onClick={leaveLobby}>LEAVE</LobbyLeaveButton>
        {lobby.ownerId == user.id ? (
          <GameStartButton>PLAY</GameStartButton>
        ) : (
          <GameStartButton onClick={changeReady}>READY</GameStartButton>
        )}
      </BotContainer>
    </>
  );
}

export default TeamBuilder;
