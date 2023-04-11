import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import { SocketProvider } from "./SocketContext";
import { LobbySocketProvider } from "../Lobby/LobbySocketContext";

function ProvideSockets() {
  const location = useLocation();

  return (
    <SocketProvider>
      <LobbySocketProvider>
        <Outlet />
      </LobbySocketProvider>
    </SocketProvider>
  );
}

export default ProvideSockets;
