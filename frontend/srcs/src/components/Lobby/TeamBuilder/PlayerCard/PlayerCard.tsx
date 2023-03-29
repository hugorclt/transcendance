import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../../../colors";
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

  return (
    <PlayerCardContainer>
      <PlayerCardLeftBorder color={team == false ? COLORS.red : COLORS.blue} />
      <PlayerInfoContainer>
        <PlayerCardAvatar />
        <PlayerCardName>{member?.user?.username}</PlayerCardName>
        <PlayerCardStatus>{member.ready ? "READY" : "..."}</PlayerCardStatus>
      </PlayerInfoContainer>
    </PlayerCardContainer>
  );
}

export default PlayerCard;
