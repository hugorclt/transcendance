import React from "react";
<<<<<<< HEAD
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { MainProvider } from "./MainContext";

function MainPage() {
  return (
    <MainProvider>
      <MainLayout />
    </MainProvider>
=======
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
>>>>>>> hugo
  );
}

export default MainPage;
