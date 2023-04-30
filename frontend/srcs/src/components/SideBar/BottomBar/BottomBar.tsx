import React, { useContext, useState } from "react";
import { BottomBarContainer } from "./BottomBarStyle";
import {
  MdNotificationsNone,
  MdSettings,
  MdLogout,
  MdNotificationsActive,
} from "react-icons/md";
import { COLORS } from "../../../colors";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { SocketContext } from "../../../services/Auth/SocketContext";
import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import { notifAtom, userAtom } from "../../../services/store";
import Popup from "reactjs-popup";
import Settings from "../../Settings/Settings";
import { ButtonNoStyle } from "../../Lobby/LobbyCreator/LobbyCreator.style";
import { PopUpBox } from "../FriendsList/FriendsCards/FriendsCardsStyle";
import NotificationsPanel from "./Notifications/Notifications";
import { SettingsContainer } from "../../Settings/Settings.style";
import { RxCross2 } from "react-icons/rx";

function BottomBar() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const axios = useAxiosPrivate();
  const [notifs, setNotif] = useAtom(notifAtom);
  const socket = useContext(SocketContext);
  const [user, setUser] = useAtom(userAtom);
  const [open, setOpen] = useState(false);

  function logout() {
    axios
      .get("/auth/logout")
      .then((response: AxiosResponse) => {
        setUser((prev) => ({
          ...prev,
          accessToken: "",
          username: "",
          status: "DISCONNECTED",
        }));
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

  const notifIsRead = () => {
    if (notifs.length == 0) return true;
    return false;
  };

  return (
    <BottomBarContainer>
      <Popup
        position="left bottom"
        trigger={
          <ButtonNoStyle>
            {notifIsRead() == false ? (
              <MdNotificationsActive
                className="buzzing"
                size={26}
                style={{ color: COLORS.secondary }}
              />
            ) : (
              <MdNotificationsNone
                size={26}
                style={{ color: COLORS.secondary }}
              />
            )}
          </ButtonNoStyle>
        }
      >
        <NotificationsPanel />
      </Popup>
      <ButtonNoStyle onClick={() => setOpen(true)}>
        <MdSettings size={26} style={{ color: COLORS.secondary }} />
      </ButtonNoStyle>
      <Popup modal open={open} closeOnDocumentClick onClose={() => setOpen(false)}>
        <SettingsContainer>
          <RxCross2 style={{cursor: "pointer"}} size={17} color={COLORS.secondary} onClick={() => setOpen(false)} />
          <Settings />
        </SettingsContainer>
      </Popup>
      <MdLogout
        onClick={logout}
        size={26}
        style={{ color: COLORS.secondary }}
      />
    </BottomBarContainer>
  );
}

export default BottomBar;
