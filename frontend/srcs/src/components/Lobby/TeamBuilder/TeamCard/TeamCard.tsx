import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { lobbyAtom } from "../../../../services/store";
import {
  TeamCardsContainer,
  TeamInfoContainer,
  TeamStatusContainer,
} from "./TeamCardStyle";
import { nanoid } from "nanoid";
import { TLobbyMember } from "../../../../services/type";
import InviteFriendsButton from "../TeamBuilderButtons/InviteFriendsButton/InviteFriendsButton";
import EmptyCard from "./EmptyCard/EmptyCard";
import PlayerCard from "./PlayerCard/PlayerCard";

interface TeamCardProps {
  team: boolean;
}
function TeamCard(props: TeamCardProps) {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const [teamMembers, setTeamMembers] = useState<TLobbyMember[]>(
    lobby.members
      ?.flatMap((member) => {
        if (member.team == props.team) {
          return member;
        }
      })
      .filter((member): member is TLobbyMember => member !== undefined)
  );
  const [availableSpace, setAvailableSpace] = useState<number>(
    lobby.nbPlayers / 2 - (teamMembers?.length ?? 0)
  );

  useEffect(() => {
    const members = lobby.members
      ?.flatMap((member) => {
        if (member.team == props.team) {
          return member;
        }
      })
      .filter((member): member is TLobbyMember => member !== undefined); //this is to trim undefined values due to flatMap
    setTeamMembers(members);
    setAvailableSpace(lobby.nbPlayers / 2 - (teamMembers?.length ?? 0));
  }, [lobby]);

  return (
    <>
      <TeamInfoContainer>
        <TeamStatusContainer>
          <h5>{props.team ? "RIGHT" : "LEFT"} TEAM</h5>
          <h5>
            {teamMembers?.length ?? 0}/{lobby.nbPlayers / 2}
          </h5>
        </TeamStatusContainer>
        <InviteFriendsButton />
      </TeamInfoContainer>
      <TeamCardsContainer>
        {teamMembers?.flatMap((member) => {
          return (
            <PlayerCard key={nanoid()} team={props.team} member={member} />
          );
        })}
        {Array.from({
          length: lobby.nbPlayers / 2 - (teamMembers?.length ?? 0),
        }).map(() => (
          <EmptyCard key={nanoid()} />
        ))}
      </TeamCardsContainer>
    </>
  );
}

export default TeamCard;
