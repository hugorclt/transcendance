import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { ReactNode, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { lobbyAtom } from "../../services/store";

function LobbyProvider({ children }: { children: ReactNode }) {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get("lobbies/current-lobby")
      .then((res: AxiosResponse) => {
        setLobby(res.data);
      })
      .catch((err: AxiosError) => {
        console.log("Error while fetching lobby");
        //SET LOBBY TO DEFAULT DISCRIMINATORY VALUE ?
      });
  }, []);

  return <>{children}</>;
}

export default LobbyProvider;
