import React from "react";
import { ProfileContainer } from "./ProfileStyle";
import { TopProfile } from "./TopProfile/TopProfile";
import { BotProfile } from "./BotProfile/BotProfile";
import { TopProfileContainer } from "./TopProfile/TopProfileStyle.js";
import { BotProfileContainer } from "./BotProfile/BotProfileStyle.js";

export function Profile() {
  return (
    <ProfileContainer>
      <TopProfile />
      <BotProfile />
    </ProfileContainer>
  );
}
