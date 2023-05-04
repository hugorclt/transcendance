import React from "react";
import { InviteFriendCardContainer } from "./InviteFriendCardStyle";
import { TInviteFriendCardsProps } from "./InviteFriendCardType";

function InviteFriendCard({ friend, ...buttonProps }: TInviteFriendCardsProps) {
  return (
    <InviteFriendCardContainer {...buttonProps}>
      <h3>{friend.username.toLocaleUpperCase()}</h3>
      <p>{friend.status.toLocaleUpperCase()}</p>
    </InviteFriendCardContainer>
  );
}

export default InviteFriendCard;
