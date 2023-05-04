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
        })
        .catch((error: AxiosError) => {
          if (error.response?.status === 405) {}
          setErrMsg("Lobby not joinable or you are already in a lobby.");
        });
    } else {
      axiosPrivate
        .post("/users/friends/add", { userFromId: userFromId, userId: userId })
        .then((response: AxiosResponse) => {
          console.log("added friend: ", JSON.stringify(response.data));
          //TODO ERROR
          setFriendList((prev) => updateArray(prev, response.data));
        })
        .catch((error: AxiosError) => {
          console.log("error adding friend: ", JSON.stringify(error.cause));
        });
    }
  };

  const refuse = () => {
    axiosPrivate
      .post("/invitations/decline", { invitationId: id })
      .then((response: AxiosResponse) => {
        console.log(
          "success declining invitation: ",
          JSON.stringify(response.data)
        );
      })
      .catch((error: AxiosError) => {
        console.log(
          "error declining invitation: ",
          JSON.stringify(error.cause)
        );
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
          style={{ color: COLORS.green, cursor: "pointer" }}>
          Accept
        </button>
        <button
          onClick={refuse}
          style={{ color: COLORS.secondary, cursor: "pointer" }}>
          Decline
        </button>
      </NotifButtonContainer>
      <hr />
      {errMsg.length > 0 ? <p style={{color: "red"}}>{errMsg}</p> : <></>}
    </NotifContainer>
  );
}

export default NotificationCards;
