import React from "react";
import { Outlet } from "react-router";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { StateProvider } from "./StateProvider";

function MainPage() {
  return (
    <MainLayout>
      <StateProvider>
        <Outlet />
      </StateProvider>
    </MainLayout>
  );
}

export default MainPage;
