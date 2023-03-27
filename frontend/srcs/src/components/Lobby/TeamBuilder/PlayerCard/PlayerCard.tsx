import React from "react";
import { COLORS } from "../../../../colors";
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
  team: string;
  member: TLobbyMember;
}

function PlayerCard(props: PlayerCardProps) {
  return (
    <PlayerCardContainer>
      <PlayerCardLeftBorder
        color={props.team == "LEFT" ? COLORS.red : COLORS.blue}
      />
      <PlayerInfoContainer>
        <PlayerCardAvatar />
        <PlayerCardName>{props.member?.user?.username}</PlayerCardName>
        <PlayerCardStatus>
          {props.member?.ready ? "READY" : "..."}
        </PlayerCardStatus>
      </PlayerInfoContainer>
    </PlayerCardContainer>
  );
}

export default PlayerCard;
