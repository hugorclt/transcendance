import React from "react";
import { InviteFriendCardContainer } from "./InviteFriendCardStyle";
import { TInviteFriendCardsProps } from "./InviteFriendCardType";

function InviteFriendCard({ friend, ...buttonProps }: TInviteFriendCardsProps) {
  return (
    <InviteFriendCardContainer {...buttonProps}>
      <h2>{friend.username.toLocaleUpperCase()}</h2>
      <h5>{friend.status.toLocaleUpperCase()}</h5>
    </InviteFriendCardContainer>
  );
}

export default InviteFriendCard;
