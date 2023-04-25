import React from "react";
import { ProfileBoxContainer } from "./ProfileBoxStyle.js";
import { userAtom } from "../../../../services/store.js";
import { useAtom } from "jotai";
import { getImageBase64 } from "../../../../services/utils/getImageBase64.js";

export function ProfileBox() {
  const [user, setUser] = useAtom(userAtom);

  return (
    <ProfileBoxContainer>
      <div>{user.username}</div>
      <div>{user.status}</div>
      <div>{user.exp}</div>
    </ProfileBoxContainer>
  );
}
