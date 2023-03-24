import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { ReactNode, useContext, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { lobbyAtom } from "../../services/store";
import { LobbySocketContext } from "../LobbyPage/LobbySocketContext";

function LobbyProvider({ children }: { children: ReactNode }) {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const socket = useContext(LobbySocketContext);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    console.log("getting lobby information on /lobbies/pistil");
    axiosPrivate
      .get("lobbies/pistil")
      .then((res: AxiosResponse) => {
        console.log("the pistil: ", JSON.stringify(res.data));
        setLobby(res.data);
      })
      .catch((err: AxiosError) => {
        console.log("Error while fetching lobby");
      });
  }, []);

  return <>{children}</>;
}

export default LobbyProvider;
