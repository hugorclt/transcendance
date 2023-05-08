import React, { useEffect, useState } from "react";
import { ProfileContainer } from "./ProfileStyle";
import { TopProfile } from "./TopProfile/TopProfile";
import { BotProfile } from "./BotProfile/BotProfile";
import { nanoid } from "nanoid";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { userAtom } from "../../services/store";
import { useAtom } from "jotai";
import { TUser } from "../../services/type";
import { AxiosError, AxiosResponse } from "axios";

export function Profile({ username }) {
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
    is2fa: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let actual: string;
    if (!username) actual = user.username;
    else actual = username;
    axiosPrivate
      .get(`/users/user/${actual}`)
      .then((response: AxiosResponse) => {
        setUser1(response.data);
        setLoading(true);
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  }, []);

  return (
    <>
      {loading == true && (
        <ProfileContainer>
          <TopProfile user={user1} />
          <BotProfile user_id={user1.id} />
        </ProfileContainer>
      )}
    </>
  );
}
