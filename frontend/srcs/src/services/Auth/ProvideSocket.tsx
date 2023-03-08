import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "../Global/GlobalProvider";
import { SocketProvider } from "./SocketContext";

function ProvideSocket() {
  const { auth } = useGlobal();
  const location = useLocation();

  return (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  );
}

export default ProvideSocket;
