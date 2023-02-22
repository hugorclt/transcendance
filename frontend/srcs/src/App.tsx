import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./views/LoginPage/LoginPage";
import HomePage from "./views/HomePage/HomePage";
import LeaderboardsPage from "./views/LeaderboardsPage/LeaderboardsPage";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import ShopPage from "./views/ShopPage/ShopPage";
import LobbyPage from "./views/LobbyPage/LobbyPage";
import MissingPage from "./views/MissingPage/MissingPage";

import RequireAuth from "./services/Auth/RequireAuth";
import PersistLogin from "./services/Auth/PersistLogin";
import Login42 from "./components/Login/Auth42/Login42";
import ChatView from "./views/ChatView/ChatView";

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/42" element={<Login42 />} />

      <Route element={<PersistLogin />}>
        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/lobby" element={<LobbyPage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
          <Route path="/chat" element={<ChatView />} />
        </Route>
      </Route>

      {/* Catch all (404)*/}
      <Route path="*" element={<MissingPage />} />
      {/* </Route> */}
    </Routes>
  );
}

export default App;
