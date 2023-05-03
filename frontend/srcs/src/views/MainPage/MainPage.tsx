import React, { Suspense, useContext, useEffect } from "react";
import { Outlet } from "react-router";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { StateProvider } from "./StateProvider";
import { LobbySocketContext } from "../../services/Lobby/LobbySocketContext";

function MainPage() {
  const socket = useContext(LobbySocketContext);

  return (
    <MainLayout>
      <Suspense fallback={<h1>LOADING...</h1>}>
        <StateProvider>
          <Outlet />
        </StateProvider>
      </Suspense>
    </MainLayout>
  );
}

export default MainPage;
