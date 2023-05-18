import React from "react";
import { ProfileBoxContainer } from "./ProfileBoxStyle.js";
import { TUser } from "../../../../services/type.js";
import { getImageBase64 } from "../../../../services/utils/getImageBase64.js";
export type TProfileBoxProps = {
  user: TUser;
};

export function ProfileBox({ user }: TProfileBoxProps) {
  const calculateLevel = () => {
    const xp = Math.max(
      1,
      Math.log(user.exp / 500) / Math.log(Math.pow(2, 1 / 5)) + 1
    );
    return xp;
  };
  return (
    <ProfileBoxContainer>
      <img
        style={{ width: "175px", height: "175px", borderRadius: "100px" }}
        src={getImageBase64(user.avatar)}
      />
      <h3>{user.username}</h3>
      <div style={{display: "flex"}}>
        <p style={{marginRight: "16px"}}>{user.status}</p>
        <div>Level: {Math.floor(calculateLevel())}</div>
      </div>
    </ProfileBoxContainer>
  );
}
