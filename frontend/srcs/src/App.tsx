import React from 'react';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Login from './Login/Login';
import HomePage from './HomePage/HomePage';
import Leaderboards from './Leaderboards/Leaderboards';
import Lobby from './Lobby/Lobby';
import Profil from './Profil/Profil';
import ChatBar from './ChatBar/ChatBar';
import Loading from './Loading/Loading';

function App() {
  
  return (
    <BrowserRouter>
      <div className="h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute component={HomePage} loading={Loading} default="/login" />}/>
          <Route path="/shop" element={<PrivateRoute component={Login} loading={Loading} default="/login" />}/>
          <Route path="/profil" element={<PrivateRoute component={Profil} loading={Loading} default="/login" />}/>
          <Route path="/leaderboards" element={<PrivateRoute component={Leaderboards} loading={Loading} default="/login" />}/>
          <Route path="/lobby" element={<PrivateRoute component={Lobby} loading={Loading} default="/login" />}/>
          <Route path="/lobby" element={<PrivateRoute component={ChatBar} loading={Loading} default="/login" />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
