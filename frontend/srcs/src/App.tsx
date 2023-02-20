import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Login from "./Login/Login";
import HomePage from "./HomePage/HomePage";
import Leaderboards from "./Leaderboards/Leaderboards";
import Lobby from "./Lobby/Lobby";
import Profile from "./Profile/Profile";
import Missing from "./Missing/Missing";
import Shop from "./Shop/Shop";
import RequireAuth from "./newComponents/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public route */}
        <Route path="/login" element={<Login />} />
        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
        </Route>
        {/* Catch all (404)*/}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
