import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import { userAtom } from "../../../../services/store";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../../../colors";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { lobbyAtom } from "../../../../services/store";
import { TLobbyMember } from "../../../../services/type";
import {
  PlayerCardAvatar,
  PlayerCardContainer,
  PlayerCardLeftBorder,
  PlayerCardName,
  PlayerCardStatus,
  PlayerInfoContainer,
} from "./PlayerCardStyle";

interface PlayerCardProps {
  team: boolean;
  member: TLobbyMember;
}

function PlayerCard({ team, member }: PlayerCardProps) {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const [user, setUser] = useAtom(userAtom);
  const axiosPrivate = useAxiosPrivate();

  const kickPlayer = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axiosPrivate
      .post("lobbies/kick", {
        lobbyId: lobby.id,
        playerId: member.userId,
      })
      .then((response: AxiosResponse) => {
        console.log("Success kicking user");
      })
      .catch((error: AxiosError) => {
        console.log(
          "error kicking player: ",
          JSON.stringify(error.response?.data)
        );
      });
  };

  return (
    <PlayerCardContainer>
      <PlayerCardLeftBorder color={team == false ? COLORS.red : COLORS.blue} />
      <PlayerInfoContainer>
        <PlayerCardAvatar />
        <PlayerCardName>{member?.user?.username}</PlayerCardName>
        {user.id == lobby.ownerId && <button onClick={kickPlayer}>KICK</button>}
        <PlayerCardStatus>{member.ready ? "READY" : "..."}</PlayerCardStatus>
      </PlayerInfoContainer>
    </PlayerCardContainer>
  );
}

export default PlayerCard;
