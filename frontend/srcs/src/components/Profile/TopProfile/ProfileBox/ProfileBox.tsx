import React from "react";
import { ProfileBoxContainer } from "./ProfileBoxStyle.js";
import { userAtom } from "../../../../services/store.js";
import { useAtom } from "jotai";

export function ProfileBox() {
  const [user, setUser] = useAtom(userAtom);

  return (
    <ProfileBoxContainer>
      <div>{user.username}</div>
      <div>{user.status}</div>
      <div>{user.avatar}</div>
      <div>{user.exp}</div>
    </ProfileBoxContainer>
  );
}
