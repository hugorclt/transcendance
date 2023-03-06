import React, { useState, useContext } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { IconContext } from "react-icons/lib";
import { AxiosResponse, AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { ChatSocketContext } from "../../../../views/ChatPage/ChatSocketContext";

function LogoutButton() {
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
    <button onClick={logout}>
      <IconContext.Provider value={{ color: "#E8C47C" }}>
        <HiOutlineLogout />
      </IconContext.Provider>
    </button>
  );
}

export default LogoutButton;
