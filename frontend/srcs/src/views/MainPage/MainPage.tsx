import React from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { MainProvider } from "./MainContext";

function MainPage() {
  return (
    <MainProvider>
      <MainLayout />
    </MainProvider>
  );
}

export default MainPage;
