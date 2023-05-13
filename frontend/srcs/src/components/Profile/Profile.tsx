import React, { useEffect, useState } from "react";
import { TopProfile } from "./TopProfile/TopProfile";
import { BotProfile } from "./BotProfile/BotProfile";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { userAtom, userDefaultValue } from "../../services/store";
import { useAtom } from "jotai";
import { TUser } from "../../services/type";
import { AxiosError, AxiosResponse } from "axios";

export function Profile({ username }) {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useAtom(userAtom);
  const [user1, setUser1] = useState<TUser>(userDefaultValue);
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
  }, [username]);

  return (
    <>
      {loading == true && (
        <>
          <TopProfile user={user1} />
          <BotProfile user_id={user1.id} />
        </>
      )}
    </>
  );
}
