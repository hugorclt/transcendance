import React, { useEffect, useState } from "react";
import { ProfileBoxContainer } from "./ProfileBoxStyle.js";
import { userAtom } from "../../../../services/store.js";
import { useAtom } from "jotai";
import { axiosPrivate } from "../../../../services/axios.js";
import { AxiosError, AxiosResponse } from "axios";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.js";
import { TUser } from "../../../../services/type.js";
import { getImageBase64 } from "../../../../services/utils/getImageBase64.js";
export type TProfileBoxProps = {
  user: TUser;
};

export function ProfileBox({ user }: TProfileBoxProps) {
  return (
    <ProfileBoxContainer>
      <img style={{width: "175px", height: "175px", borderRadius: "100px"}} src={getImageBase64(user.avatar)}></img>
      <h3>{user.username}</h3>
      <p>{user.status}</p>
      <div>{user.exp}</div>
    </ProfileBoxContainer>
  );
}
