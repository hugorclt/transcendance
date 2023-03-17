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
  TeamBuilderContainer,
  TeamCardsContainer,
  TeamContainer,
  TeamName,
  TeamNbPlayers,
  TeamInfoContainer,
  TeamStatusContainer,
  LobbyLeaveButton,
} from "./TeamBuilderStyle";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import { userAtom, lobbyAtom, friendAtom } from "../../../services/store";
import InviteFriendsButton from "./InviteFriendsButton/InviteFriendsButton";

function TeamBuilder() {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useAtom(userAtom);
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const [friendsList, setFriendsList] = useAtom(friendAtom);

  const inviteFriends = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  const leaveLobby = (e: React.SyntheticEvent) => {
    console.log("Leave Button pressed");
    e.preventDefault();
    axiosPrivate
      .post("http://localhost:3000/lobbies/leave", {
        userId: user.id,
        lobbyId: lobby.id,
      })
      .then((response: AxiosResponse) => {
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
            <InviteFriendsButton />
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
            <InviteFriendsButton />
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
        <LobbyLeaveButton onClick={leaveLobby}>LEAVE</LobbyLeaveButton>
        <GameStartButton>PLAY</GameStartButton>
      </BotContainer>
    </TeamBuilderContainer>
  );
}

export default TeamBuilder;
