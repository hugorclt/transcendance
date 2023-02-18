import React from 'react';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from './Layouts/Layout';
import Login from './Login/Login';
import HomePage from './HomePage/HomePage';
import Leaderboards from './Leaderboards/Leaderboards';
import Lobby from './Lobby/Lobby';
import Profile from './Profile/Profile';
import Missing from './Missing/Missing';
import ChatBar from './ChatBar/ChatBar';
import Loading from './Loading/Loading';
import Shop from './Shop/Shop';

function App() {
    
  // return (
  //   <BrowserRouter>
  //     <div className="h-screen">
  //       <Routes>
  //         <Route path="/login" element={<Login />} />
  //         <Route path="/" element={<PrivateRoute component={HomePage} loading={Loading} default="/login" />}/>
  //         <Route path="/shop" element={<PrivateRoute component={Login} loading={Loading} default="/login" />}/>
  //         <Route path="/profil" element={<PrivateRoute component={Profil} loading={Loading} default="/login" />}/>
  //         <Route path="/leaderboards" element={<PrivateRoute component={Leaderboards} loading={Loading} default="/login" />}/>
  //         <Route path="/lobby" element={<PrivateRoute component={Lobby} loading={Loading} default="/login" />}/>
  //         <Route path="/lobby" element={<PrivateRoute component={ChatBar} loading={Loading} default="/login" />}/>
  //       </Routes>
  //     </div>
  //   </BrowserRouter>
  // )

  return (
    <Routes>
      <Route path="/" element={<Layout />}> 
        {/* Public route */}
        <Route path="/login" element={<Login />} />
        {/* Protected routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/leaderboards" element={<Leaderboards />} />
        {/* Catch all (404)*/}
        <Route path="*" element={<Missing/>} />
      </Route>
    </Routes>
  )
}

export default App;
