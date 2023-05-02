import React, { useEffect, useState } from "react";
import { ProfileBoxContainer } from "./ProfileBoxStyle.js";
import { userAtom } from "../../../../services/store.js";
import { useAtom } from "jotai";
import { axiosPrivate } from "../../../../services/axios.js";
import { AxiosError, AxiosResponse } from "axios";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.js";
import { TUser } from "../../../../services/type.js";

export function ProfileBox({ username }) {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useAtom(userAtom);
  const [user1, setUser1] = useState<TUser>({
    id: "",
    username: "",
    accessToken: "",
    status: "",
    avatar: "",
    exp: 0,
    balance: 0,
  });

  let actual: string;
  if (user.username == username) actual = user.username;
  else actual = username;

  useEffect(() => {
    axiosPrivate
      .get(`/users/user/${actual}`)
      .then((response: AxiosResponse) => {
        setUser1(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  }, []);
  console.log('actual = ', actual);
  console.log('user = ', user.username);

  return (
    <ProfileBoxContainer>
      <div>{user1.username}</div>
      <div>{user1.status}</div>
      <div>{user1.exp}</div>
    </ProfileBoxContainer>
  );
}
