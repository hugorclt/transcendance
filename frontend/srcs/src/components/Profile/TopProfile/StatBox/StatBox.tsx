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
import { TProfileBoxProps } from "../ProfileBox/ProfileBox.js";

export function StatBox({ user }: TProfileBoxProps) {
  const axiosPrivate = useAxiosPrivate();
  const [stats, setStats] = useState<TStat>({
    id: "",
    xp: 0,
    lvl: 0,
    nbGame: 0,
    nbWin: 0,
  });

  useEffect(() => {
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
