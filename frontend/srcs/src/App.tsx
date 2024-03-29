import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./views/LoginPage/LoginPage";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import RankingPage from "./views/RankingPage/RankingPage";
import ShopPage from "./views/ShopPage/ShopPage";
import MissingPage from "./components/common/Missing/MissingPage";

import RequireAuth from "./services/Auth/RequireAuth";
import PersistLogin from "./services/Auth/PersistLogin";
import Login42 from "./components/Login/Login42/Login42";
import RequireStatus from "./services/Status/RequireStatus";
import RequireUnAuth from "./services/Auth/RequiredUnAuth";
import MainPage from "./views/MainPage/MainPage";
import LobbyPage from "./views/LobbyPage/LobbyPage";
import GamePage from "./views/GamePage/GamePage";
import ProvideSockets from "./services/Auth/ProvideSockets";
import RequireInGameStatus from "./services/Status/RequireInGameStatus";
import Login2FA from "./components/Login/Login2FA/Login2FA";
import RequireId from "./services/Auth/RequireId";

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        {/* Public route */}
        <Route element={<RequireUnAuth />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/42" element={<Login42 />} />
        </Route>
        <Route element={<RequireId />}>
          <Route path="/login/2fa" element={<Login2FA />} />
        </Route>
        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route element={<ProvideSockets />}>
            <Route element={<RequireStatus />}>
              <Route element={<MainPage />}>
                <Route path="/" element={<LobbyPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/profile/:username?" element={<ProfilePage />} />
                <Route path="/ranking" element={<RankingPage />} />
              </Route>
            </Route>
            <Route element={<RequireInGameStatus />}>
              <Route path="/game" element={<GamePage />} />
            </Route>
          </Route>
        </Route>
      </Route>

      {/* Catch all (404)*/}
      <Route path="*" element={<MissingPage />} />
    </Routes>
  );
}

export default App;
