import React from "react";
import { ProfileBoxContainer } from "./ProfileBox/ProfileBoxStyle.js";
import { ProfileBox } from "./ProfileBox/ProfileBox";
import { StatBox } from "./StatBox/StatBox.jsx";
import { TopProfileContainer } from "./TopProfileStyle.js";

export function TopProfile() {
  return (
    <TopProfileContainer>
      <ProfileBoxContainer>
        <ProfileBox />
      </ProfileBoxContainer>
      <StatBox />
    </TopProfileContainer>
  );
}
