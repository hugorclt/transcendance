import React from 'react';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import {BrowserRouter, Route, Routes} from "react-router-dom"

import Login from './Login/Login';
import HomePage from './HomePage/HomePage';
import Leaderboards from './Leaderboards/Leaderboards';
import Lobby from './Lobby/Lobby';
import Profil from './Profil/Profil';
import ChatBar from './ChatBar/ChatBar';

function App() {
  
  return (
    <BrowserRouter>
      <div className="h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute component={HomePage} />}/>
          <Route path="/shop" element={<PrivateRoute component={Login} />}/>
          <Route path="/profil" element={<PrivateRoute component={Profil} />}/>
          <Route path="/leaderboards" element={<PrivateRoute component={Leaderboards} />}/>
          <Route path="/lobby" element={<PrivateRoute component={Lobby} />}/>
          <Route path="/lobby" element={<PrivateRoute component={ChatBar} />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
