import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { lobbyAtom } from "../../../../services/store";
import InviteFriendsButton from "../InviteFriendsButton/InviteFriendsButton";
import PlayerCard from "../PlayerCard/PlayerCard";
import {
  TeamCardsContainer,
  TeamContainer,
  TeamInfoContainer,
  TeamName,
  TeamNbPlayers,
  TeamStatusContainer,
} from "./TeamCardStyle";
import { nanoid } from "nanoid";
import { TLobbyMember } from "../../../../services/type";

interface TeamCardProps {
  team: boolean;
}
function TeamCard(props: TeamCardProps) {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const [teamMembers, setTeamMembers] = useState<TLobbyMember[]>();

  useEffect(() => {
    const members = lobby.members
      ?.flatMap((member) => {
        if (member.team == props.team) {
          return member;
        }
      })
      .filter((member): member is TLobbyMember => member !== undefined); //this is to trim undefined values due to flatMap
    if (members) setTeamMembers(members);
  }, [lobby.members]);

  return (
    <TeamContainer>
      <TeamInfoContainer>
        <TeamStatusContainer>
          <TeamName>{props.team ? "RIGHT" : "LEFT"} TEAM</TeamName>
          <TeamNbPlayers>
            {teamMembers?.length || "0"}/{lobby.nbPlayers / 2}
          </TeamNbPlayers>
        </TeamStatusContainer>
        <InviteFriendsButton />
      </TeamInfoContainer>
      <TeamCardsContainer>
        {teamMembers?.flatMap((member) => {
          return (
            <PlayerCard key={member.id} team={props.team} member={member} />
          );
        })}
      </TeamCardsContainer>
    </TeamContainer>
  );
}

export default TeamCard;
