import { useAtom } from "jotai";
import React from "react";
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

interface TeamCardProps {
  team: string;
}
function TeamCard(props: TeamCardProps) {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const teamMembers = lobby.members?.flatMap((member) => {
    if (member.team == props.team) {
      console.log("member team ", props.team, ": ", member);
      return member;
    }
  });

  return (
    <TeamContainer>
      <TeamInfoContainer>
        <TeamStatusContainer>
          <TeamName>{props.team} TEAM</TeamName>
          <TeamNbPlayers>
            {teamMembers?.length || "0"}/{lobby.nbPlayers / 2}
          </TeamNbPlayers>
        </TeamStatusContainer>
        <InviteFriendsButton />
      </TeamInfoContainer>
      <TeamCardsContainer>
        {teamMembers &&
          teamMembers[0] &&
          teamMembers.map((member) => {
            console.log("teamMembers: ", teamMembers);
            return (
              <PlayerCard key={nanoid()} team={props.team} member={member!} />
            );
          })}
      </TeamCardsContainer>
    </TeamContainer>
  );
}

export default TeamCard;
