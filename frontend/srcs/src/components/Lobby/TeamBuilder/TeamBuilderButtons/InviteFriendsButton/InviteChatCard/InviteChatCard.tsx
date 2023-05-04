import React from "react";
import { InviteChatCardContainer } from "./InviteChatCardStyle";
import { TInviteChatCardsProps } from "./InviteChatCardType";

function InviteChatCard({ chat, ...buttonProps }: TInviteChatCardsProps) {
  return (
    <InviteChatCardContainer {...buttonProps}>
      <h3>{chat.name}</h3>
      <p>{chat.participants.length} users</p>
    </InviteChatCardContainer>
  );
}

export default InviteChatCard;
