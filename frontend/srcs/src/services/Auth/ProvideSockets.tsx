import React from "react";
import { Outlet } from "react-router-dom";
import { SocketProvider } from "./SocketContext";
import { LobbySocketProvider } from "../Lobby/LobbySocketContext";

function ProvideSockets() {
  return (
    <SocketProvider>
      <LobbySocketProvider>
        <Outlet />
      </LobbySocketProvider>
    </SocketProvider>
  );
}

export default ProvideSockets;
