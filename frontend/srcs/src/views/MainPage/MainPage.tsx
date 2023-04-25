import React, { Suspense } from "react";
import { Outlet } from "react-router";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { StateProvider } from "./StateProvider";

function MainPage() {
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
