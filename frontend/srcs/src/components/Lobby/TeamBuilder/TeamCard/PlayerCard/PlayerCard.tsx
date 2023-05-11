import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import { userAtom } from "../../../../../services/store";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../../../../colors";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { lobbyAtom } from "../../../../../services/store";
import { TLobbyMember } from "../../../../../services/type";
import {
  KickButton,
  PlayerCardAvatar,
  PlayerCardContainer,
  PlayerCardLeftBorder,
  PlayerInfoContainer,
  PlayerNameContainer,
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
      .then((response: AxiosResponse) => {})
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
        <PlayerNameContainer>
          <h4>{member?.user?.username}</h4>
        </PlayerNameContainer>
        {user.id == lobby.ownerId && member?.userId != lobby.ownerId && (
          <KickButton onClick={kickPlayer}>KICK</KickButton>
        )}
        <h4>{member.ready ? "READY" : "..."}</h4>
      </PlayerInfoContainer>
    </PlayerCardContainer>
  );
}

export default PlayerCard;
