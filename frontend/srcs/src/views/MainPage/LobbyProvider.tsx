import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { ReactNode, useContext, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { lobbyAtom, lobbyDefaultValue, userAtom } from "../../services/store";
import { LobbySocketContext } from "../../services/Lobby/LobbySocketContext";
import { updateArray } from "../../services/utils/updateArray";
import { TLobbyMember } from "../../services/type";
import { useNavigate } from "react-router";

function LobbyProvider({ children }: { children: ReactNode }) {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const [user, setUser] = useAtom(userAtom);
  const socket = useContext(LobbySocketContext);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    axiosPrivate
      .get("lobbies/current-lobby")
      .then((res: AxiosResponse) => {
        setLobby((prev) => ({ ...prev, ...res.data }));
      })
      .catch((err: AxiosError) => {
        console.log("Error while fetching lobby");
        setLobby(lobbyDefaultValue);
      });
  }, []);

  

  return <>{children}</>;
}

export default LobbyProvider;
