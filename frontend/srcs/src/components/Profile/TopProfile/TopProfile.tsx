import React from "react";
import { ProfileBoxContainer } from "./ProfileBox/ProfileBoxStyle.js";
import { ProfileBox } from "./ProfileBox/ProfileBox";
import { StatBox } from "./StatBox/StatBox.jsx";
import { TopProfileContainer } from "./TopProfileStyle.js";
import { nanoid } from "nanoid";

export function TopProfile({ username }) {
  return (
    <TopProfileContainer>
      <ProfileBoxContainer>
        <ProfileBox username={username} />
      </ProfileBoxContainer>
      <StatBox username={username} />
    </TopProfileContainer>
  );
}
