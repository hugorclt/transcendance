import React from "react";
import { ProfileLayoutContainer } from "./ProfileLayoutStyle.js";
import { Profile } from "../../components/Profile/Profile";
import { nanoid } from "nanoid";

export function ProfileLayout({ username }) {
  return (
    <ProfileLayoutContainer>
      <Profile username={username} />
    </ProfileLayoutContainer>
  );
}
