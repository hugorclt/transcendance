import { AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { ReactNode, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { lobbyAtom, userAtom } from "../../services/store";

function LobbyProvider({ children }: { children: ReactNode }) {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get("lobbies/current-lobby").then((res: AxiosResponse) => {
      setLobby((prev) => ({ ...prev, ...res.data }));
    });
  }, []);

  return <>{children}</>;
}

export default LobbyProvider;
