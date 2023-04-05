import React, { useContext, useState } from "react";
import { BottomBarContainer } from "./BottomBarStyle";
import { MdNotificationsNone, MdSettings, MdLogout } from "react-icons/md";
import { COLORS } from "../../../colors";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { SocketContext } from "../../../services/Auth/SocketContext";
import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import { userAtom } from "../../../services/store";

function BottomBar() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const axios = useAxiosPrivate();
  const socket = useContext(SocketContext);
  const [user, setUser] = useAtom(userAtom);

  function logout() {
    axios
      .get("/auth/logout")
      .then((response: AxiosResponse) => {
        setUser((prev) => ({ ...prev, accessToken: "", username: "", status: "DISCONNECTED" }));
        socket?.emit("logout", response.data);
        navigate("/login", { replace: true });
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
      <MdNotificationsNone size={26} style={{ color: COLORS.secondary }} />
      <MdSettings size={26} style={{ color: COLORS.secondary }} />
      <MdLogout
        onClick={logout}
        size={26}
        style={{ color: COLORS.secondary }}
      />
    </BottomBarContainer>
  );
}

export default BottomBar;
