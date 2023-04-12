import React, { useContext, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { SocketContext } from "../Auth/SocketContext";
import { useAtom } from "jotai";
import { lobbyAtom, userAtom } from "../store";

function RequireStatus() {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const [user, setUser] = useAtom(userAtom);
  const socket = useContext(SocketContext);
  const location = useLocation();

  useEffect(() => {
    socket?.on("on-self-status-update", (newStatus) => {
      setUser((prev) => ({ ...prev, status: newStatus }));
    });

    return () => {
      socket?.off("on-self-status-update");
    };
  }, [socket]);

  return lobby?.state == "GAME" ? (
    <Navigate to="/game" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default RequireStatus;
