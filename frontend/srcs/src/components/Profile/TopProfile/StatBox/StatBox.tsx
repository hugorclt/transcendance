import React, { useEffect, useState } from "react";
import {
  IdContainer,
  LvlBoxContainer,
  NbGameContainer,
  NbWinContainer,
  StatBoxContainer,
} from "./StatBoxStyle.js";
import { userAtom } from "../../../../services/store.js";
import { useAtom } from "jotai";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.js";
import { AxiosError, AxiosResponse } from "axios";
import { TStat } from "../../../../services/type.js";
import { AiFillTrophy } from "react-icons/ai";
import { IoLogoGameControllerB } from "react-icons/io";
import { FaCrown } from "react-icons/fa";
import { COLORS } from "../../../../colors.js";

export function StatBox({ username }) {
  const [user, setUser] = useAtom(userAtom);
  const axiosPrivate = useAxiosPrivate();
  const [stats, setStats] = useState<TStat>({
    id: "",
    xp: 0,
    lvl: 0,
    nbGame: 0,
    nbWin: 0,
  });

  let actual: string;
  if (user.username == username) actual = user.username;
  else actual = username;

  useEffect(() => {
    console.log(username);
    axiosPrivate
      .get(`stats/user/${user.id}`)
      .then((response: AxiosResponse) => {
        setStats(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  }, []);

  return (
    <StatBoxContainer>
      <IdContainer>
        <div>ID = {stats.id} </div>
      </IdContainer>
      <LvlBoxContainer>
        <FaCrown size={42} color={COLORS.white} />
        <div>LVL = {stats.lvl}</div>
      </LvlBoxContainer>
      <NbGameContainer>
        <IoLogoGameControllerB size={42} color={COLORS.white} />
        <div>GAMES = {stats.nbGame}</div>
      </NbGameContainer>
      <NbWinContainer>
        <AiFillTrophy size={42} color={COLORS.white} />
        <div>WINS = {stats.nbWin}</div>
      </NbWinContainer>
    </StatBoxContainer>
  );
}
