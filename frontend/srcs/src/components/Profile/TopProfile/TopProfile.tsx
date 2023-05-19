import React from "react";
import { ProfileBoxContainer } from "./ProfileBox/ProfileBoxStyle.js";
import { ProfileBox, TProfileBoxProps } from "./ProfileBox/ProfileBox";
import { StatBox } from "./StatBox/StatBox.jsx";
import { TopProfileContainer } from "./TopProfileStyle.js";

export function TopProfile({ user }: TProfileBoxProps) {
  return (
    <TopProfileContainer>
      <ProfileBoxContainer>
        <ProfileBox user={user} />
      </ProfileBoxContainer>
      <StatBox user={user} />
    </TopProfileContainer>
  );
}
