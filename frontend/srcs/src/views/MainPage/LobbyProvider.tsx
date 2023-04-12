import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { ReactNode, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { lobbyAtom, lobbyDefaultValue } from "../../services/store";

function LobbyProvider({ children }: { children: ReactNode }) {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get("lobbies/current-lobby")
      .then((res: AxiosResponse) => {
        console.log("LOBBY ;", lobby);
        setLobby(res.data);
      })
      .catch((err: AxiosError) => {
        console.log("Error while fetching lobby");
        setLobby(lobbyDefaultValue);
      });
  }, []);

  return <>{children}</>;
}

export default LobbyProvider;
