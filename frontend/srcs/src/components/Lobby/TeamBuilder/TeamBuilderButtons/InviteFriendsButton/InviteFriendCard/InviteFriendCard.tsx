import React from "react";
import { InviteFriendCardContainer } from "./InviteFriendCardStyle";
import { TInviteFriendCardsProps } from "./InviteFriendCardType";

function InviteFriendCard({ friend }: TInviteFriendCardsProps) {
  return (
    <InviteFriendCardContainer>
      <img src="" />
      <div>
        <h2>{friend.username.toLocaleUpperCase()}</h2>
        <h5>{friend.status.toLocaleUpperCase()}</h5>
      </div>
    </InviteFriendCardContainer>
  );
}

export default InviteFriendCard;
