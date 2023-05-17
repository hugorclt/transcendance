import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useResetAtoms, userAtom } from "../../services/store";
import { SocketContext } from "../../services/Auth/SocketContext";
import { LobbySocketContext } from "../../services/Lobby/LobbySocketContext";

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useAtom(userAtom);
  const [isLoaded, setIsLoaded] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const socket = useContext(SocketContext);
  const gameSocket = useContext(LobbySocketContext);
  const resetAtom = useResetAtoms();

  useEffect(() => {
    axiosPrivate
      .get("/users/me")
      .then((res: AxiosResponse) => {
        setUser((prev) => ({
          ...prev,
          ...res.data,
          exp: res.data.xp,
        }));
        setIsLoaded(true);
      })
      .catch((res: AxiosError) =>
        navigate("/login", { state: { from: location }, replace: true })
      );
  }, []);

  useEffect(() => {
    socket?.on("on-self-status-update", (newStatus) => {
      setUser((prev) => ({ ...prev, status: newStatus }));
      if (newStatus === "DISCONNECTED") {
        resetAtom();
        socket?.removeAllListeners();
        gameSocket?.removeAllListeners();
        socket?.disconnect();
        gameSocket?.disconnect();
        navigate("/login", { state: { from: location }, replace: true });
      }
    });

    return () => {
      socket?.off("on-self-status-update");
    };
  }, [socket]);

  return <>{isLoaded == true ? children : <h1>Loading...</h1>}</>;
}

export default UserProvider;
