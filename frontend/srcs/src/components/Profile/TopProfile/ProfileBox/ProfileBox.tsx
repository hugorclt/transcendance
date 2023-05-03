import React, { useEffect, useState } from "react";
import { ProfileBoxContainer } from "./ProfileBoxStyle.js";
import { userAtom } from "../../../../services/store.js";
import { useAtom } from "jotai";
import { axiosPrivate } from "../../../../services/axios.js";
import { AxiosError, AxiosResponse } from "axios";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.js";
import { TUser } from "../../../../services/type.js";
export type TProfileBoxProps = {
  user: TUser;
};

export function ProfileBox({ user }: TProfileBoxProps) {
  return (
    <ProfileBoxContainer>
      <div>{user.username}</div>
      <div>{user.status}</div>
      <div>{user.exp}</div>
    </ProfileBoxContainer>
  );
}
