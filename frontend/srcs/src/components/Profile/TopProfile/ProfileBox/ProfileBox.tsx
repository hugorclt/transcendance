import React from "react";
import { ProfileBoxContainer } from "./ProfileBoxStyle.js";
import { TUser } from "../../../../services/type.js";
import { getImageBase64 } from "../../../../services/utils/getImageBase64.js";
export type TProfileBoxProps = {
  user: TUser;
};

export function ProfileBox({ user }: TProfileBoxProps) {
  return (
    <ProfileBoxContainer>
      <img
        style={{ width: "175px", height: "175px", borderRadius: "100px" }}
        src={getImageBase64(user.avatar)}
      />
      <h3>{user.username}</h3>
      <p>{user.status}</p>
      <div>{user.exp}</div>
    </ProfileBoxContainer>
  );
}
