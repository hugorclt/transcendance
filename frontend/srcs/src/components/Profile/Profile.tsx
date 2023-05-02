import React from "react";
import { ProfileContainer } from "./ProfileStyle";
import { TopProfile } from "./TopProfile/TopProfile";
import { BotProfile } from "./BotProfile/BotProfile";
import { nanoid } from "nanoid";

export function Profile({ username }) {
  return (
    <ProfileContainer>
      <TopProfile username={username} />
      <BotProfile username={username} />
    </ProfileContainer>
  );
}
