import React, { useContext, useEffect, useRef } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import { SocketContext } from "../Auth/SocketContext";
import { useAtom } from "jotai";
import { lobbyAtom, userAtom } from "../store";

function RequireStatus() {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const [user, setUser] = useAtom(userAtom);
  const socket = useContext(SocketContext);
  const location = useLocation();
  const querySent = useRef(false);
  const axiosPrivate = useAxiosPrivate();

  function updateSelfStatus(status: string) {
    setUser((prev) => ({ ...prev, status: status }));
  }

  useEffect(() => {
    if (!querySent.current) {
      axiosPrivate
        .get("/users/status")
        .then((res: AxiosResponse) => {
          updateSelfStatus(res.data.status);
        })
        .catch((err: AxiosError) => {
          console.log(JSON.stringify(err));
        });
      querySent.current = true;
    }
  }, []);

  useEffect(() => {
    socket?.on("on-self-status-update", (newStatus) => {
      updateSelfStatus(newStatus);
    });

    return () => {
      socket?.off("on-self-status-update");
    };
  }, [socket]);

  //si lobby.state = GAME => redirect to game
  return lobby?.state == "GAME" ? (
    <Navigate to="/game" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default RequireStatus;
