import React, { useEffect } from "react";
import { StatBoxContainer } from "./StatBoxStyle.js";
import { userAtom } from "../../../../services/store.js";
import { useAtom } from "jotai";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.js";
import { AxiosError, AxiosResponse } from "axios";

export function StatBox() {
  const [user, setUser] = useAtom(userAtom);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    console.log("Getting user stats: ", user.id);
    axiosPrivate
      .get(`stats/user/${user.id}`)
      .then((response: AxiosResponse) => {
        setUser((prev) => ({ ...prev, stats: response.data }));
        console.log(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  }, []);

  return <div>StatBox</div>;
}
