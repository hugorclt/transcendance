import React, { useEffect, useState } from "react";
import { StatBoxContainer } from "./StatBoxStyle.js";
import { userAtom } from "../../../../services/store.js";
import { useAtom } from "jotai";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.js";
import { AxiosError, AxiosResponse } from "axios";
import { TStat } from "../../../../services/type.js";

export function StatBox() {
  const [user, setUser] = useAtom(userAtom);
  const axiosPrivate = useAxiosPrivate();
  const [stats, setStats] = useState<TStat>({
    id: "",
    xp: 0,
    lvl: 0,
    nbGame: 0,
    nbWin: 0,
  });

  useEffect(() => {
    console.log("Getting user stats: ", user.id);
    axiosPrivate
      .get(`stats/user/${user.id}`)
      .then((response: AxiosResponse) => {
        setStats(response.data);
        console.log("RESPONSE = ", response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      <div>ID = {stats.id}</div>
      <div>LVL = {stats.lvl}</div>
      <div>GAMES = {stats.nbGame}</div>
      <div>WINS = {stats.nbWin}</div>
    </div>
  );
}
