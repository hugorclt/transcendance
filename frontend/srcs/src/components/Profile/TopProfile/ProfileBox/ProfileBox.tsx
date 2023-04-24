import React, { useEffect } from "react";
import { ProfileBoxContainer } from "./ProfileBoxStyle.js";
import { userAtom } from "../../../../services/store.js";
import { useAtom } from "jotai";
import { axiosPrivate } from "../../../../services/axios.js";
import { AxiosError, AxiosResponse } from "axios";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.js";

export function ProfileBox({ username }) {
  const [user, setUser] = useAtom(userAtom);
  const axiosPrivate = useAxiosPrivate();

  let actual: string;
  if (user.username == username) actual = user.username;
  else actual = username;

  useEffect(() => {
    console.log(username);
    axiosPrivate
      .get(`/user/${actual}`)
      .then((response: AxiosResponse) => {
        setUser(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  }, []);

  return (
    <ProfileBoxContainer>
      <div>{user.username}</div>
      <div>{user.status}</div>
      <div>{user.exp}</div>
    </ProfileBoxContainer>
  );
}
