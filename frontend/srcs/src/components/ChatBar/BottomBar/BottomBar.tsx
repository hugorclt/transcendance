import React, { useContext, useState } from 'react'
import { BottomBarContainer } from './BottomBarStyle'
import { MdNotificationsNone, MdSettings, MdLogout } from 'react-icons/md'
import { COLORS } from '../../../colors'
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { ChatSocketContext } from '../../../views/ChatPage/ChatSocketContext';
import { AxiosError, AxiosResponse } from 'axios';

function BottomBar() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const axios = useAxiosPrivate();
  const socket = useContext(ChatSocketContext);

  function logout() {
    axios
      .get("/auth/logout")
      .then((response: AxiosResponse) => {
        navigate("/login", { replace: true });
        socket?.emit('logout', response.data);
      })
      .catch((error: AxiosError) => {
        if (!error?.response) {
          setErrMsg("No server response");
        } else if (error.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
        setSuccess(false);
      });
  }

  return (
    <BottomBarContainer>
        <MdNotificationsNone size={26} style={{color: COLORS.secondary}}/>
        <MdSettings size={26} style={{color: COLORS.secondary}}/>
        <MdLogout onClick={logout} size={26} style={{color: COLORS.secondary}}/>
    </BottomBarContainer>
  )
}

export default BottomBar