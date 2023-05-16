import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { COLORS } from "../../../../../colors";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import {
  friendAtom,
  lobbyAtom,
  notifAtom,
} from "../../../../../services/store";
import { updateArray } from "../../../../../services/utils/updateArray";
import { NotifButtonContainer, NotifContainer } from "../Notifications.style";

function NotificationCards({
  id,
  username,
  desc,
  type,
  lobbyId,
  userId,
  userFromId,
}) {
  const axiosPrivate = useAxiosPrivate();
  const [friend, setFriendList] = useAtom(friendAtom);
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const [notif, setNotifs] = useAtom(notifAtom);
  const [errMsg, setErrMsg] = useState("");

  const accept = () => {
    if (type == "LOBBY") {
      axiosPrivate
        .post("/lobbies/join", { lobbyId: lobbyId, userId: userId })
        .then((response: AxiosResponse) => {
          setLobby((prev) => ({ ...prev, ...response.data }));
          setErrMsg("");
        })
        .catch((error: AxiosError) => {
          setErrMsg("Lobby not joinable or you are already in a lobby.");
        });
    } else {
      axiosPrivate
        .post("/users/friends/add", { userFromId: userFromId, userId: userId })
        .then((response: AxiosResponse) => {
          setFriendList((prev) => updateArray(prev, response.data));
          setErrMsg("");
        })
        .catch((error: AxiosError) => {
          setErrMsg("Error adding friend");
        });
    }
  };

  const refuse = () => {
    axiosPrivate
      .post("/invitations/decline", { invitationId: id })
      .then((response: AxiosResponse) => {
        setErrMsg("");
      })
      .catch((error: AxiosError) => {
        setErrMsg("Error declining invitation");
      });
  };

  return (
    <NotifContainer>
      <p>
        <strong>{username}</strong> {desc}
      </p>
      <NotifButtonContainer>
        <button
          onClick={accept}
          style={{ color: COLORS.green, cursor: "pointer" }}
        >
          Accept
        </button>
        <button
          onClick={refuse}
          style={{ color: COLORS.secondary, cursor: "pointer" }}
        >
          Decline
        </button>
      </NotifButtonContainer>
      <hr />
      {errMsg.length > 0 ? <p style={{ color: "red" }}>{errMsg}</p> : <></>}
    </NotifContainer>
  );
}

export default NotificationCards;
