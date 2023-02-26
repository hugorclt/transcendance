import React, { useContext } from "react";
import { TiTick } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import { IconContext } from "react-icons/lib";
import { StatusContext } from "../../../statusPageContext";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import { NotifListContext } from "./NotificationsContext";

function NotificationsMessage(props: { username: string }) {
  const socket = useContext(StatusContext);
  const axiosPrivate = useAxiosPrivate();
  const {notifList, setNotifList} = useContext(NotifListContext);

  const acceptRequest = () => {
    axiosPrivate
      .get("auth/me")
      .then((res: AxiosResponse) => {
        socket?.emit("friend-request-reply", {
          fromUsername: props.username,
          toId: res.data.id,
          isReplyTrue: true,
        });
        setNotifList(notifList.filter((username) => username !== props.username));
      })
      .catch((err: AxiosError) => {
        console.log("error: login required!");
      });
  };

  const rejectRequest = () => {
    axiosPrivate
      .get("auth/me")
      .then((res: AxiosResponse) => {
        socket?.emit("friend-request-reply", {
          fromUsername: props.username,
          toId: res.data.id,
          isReplyTrue: false,
        });
        setNotifList(notifList.filter((username) => username !== props.username));
      })
      .catch((err: AxiosError) => {
        console.log("error: login required!");
      });
  };
  return (
    <ul
      style={{ color: "#E8C47C", borderColor: "#E8C47C" }}
      className="p-2 border rounded-xl">
      {props.username} has sent you a friend request
      <div className="flex justify-around">
        <div onClick={acceptRequest}>
          <IconContext.Provider value={{ color: "green" }}>
            <TiTick />
          </IconContext.Provider>
        </div>
        <div onClick={rejectRequest}>
          <IconContext.Provider value={{ color: "red" }}>
            <RxCross1 />
          </IconContext.Provider>
        </div>
      </div>
    </ul>
  );
}

export default NotificationsMessage;
