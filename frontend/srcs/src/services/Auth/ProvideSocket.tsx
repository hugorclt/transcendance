import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import { SocketProvider } from "./SocketContext";

function ProvideSocket() {
  const location = useLocation();

  return (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  );
}

export default ProvideSocket;
