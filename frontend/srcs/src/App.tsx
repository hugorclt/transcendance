import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./views/LoginPage/LoginPage";
import HomePage from "./views/HomePage/HomePage";
import LeaderboardsPage from "./views/LeaderboardsPage/LeaderboardsPage";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import ShopPage from "./views/ShopPage/ShopPage";
import LobbyPage from "./views/LobbyPage/LobbyPage";
import MissingPage from "./views/MissingPage/MissingPage";
import GamePage from "./views/GamePage/GamePage";

import RequireAuth from "./services/Auth/RequireAuth";
import PersistLogin from "./services/Auth/PersistLogin";
import Login42 from "./components/Login/Auth42/Login42";
import MainLayout from "./layouts/MainLayout/MainLayout";
import LoginLayout from "./layouts/LoginLayout/LoginLayout";
import RequireStatus from "./services/Status/RequireStatus";
import RequireInGameStatus from "./services/Status/RequireInGameStatus";
import RequireUnAuth from "./services/Auth/RequiredUnAuth";

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
         {/* Public route */}
        <Route element={<RequireUnAuth/>}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/42" element={<LoginLayout><Login42 /></LoginLayout>} />
        </Route>
        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route element={<RequireStatus/>}>
            <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
            <Route path="/shop" element={<MainLayout><ShopPage /></MainLayout>} />
            <Route path="/profile" element={<MainLayout><ProfilePage /></MainLayout>} />
            <Route path="/lobby" element={<MainLayout><LobbyPage /></MainLayout>} />
            <Route path="/leaderboards" element={<MainLayout><LeaderboardsPage /></MainLayout>} />
          </Route>
          <Route element={<RequireInGameStatus />}>
            <Route path="/game" element={<GamePage />} />
          </Route>
        </Route>
      </Route>

      {/* Catch all (404)*/}
      <Route path="*" element={<MissingPage />} />
    </Routes>
  );
}

export default App;
