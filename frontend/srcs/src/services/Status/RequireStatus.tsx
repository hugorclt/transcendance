import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAtom } from "jotai";
import { lobbyAtom, userAtom } from "../store";

function RequireStatus() {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const location = useLocation();

  return lobby?.state == "GAME" ? (
    <Navigate to="/game" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default RequireStatus;
