import React, { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import { ChatSocketContext } from "../../../../views/ChatPage/ChatSocketContext";

function FriendNotifications() {
  const socket = useContext(ChatSocketContext);
  const axiosPrivate = useAxiosPrivate();

  const acceptRequest = (username: string) => {
    axiosPrivate
      .get("auth/me")
      .then((res: AxiosResponse) => {
        socket?.emit("friend-request-reply", {
          fromUsername: username,
          toId: res.data.id,
          isReplyTrue: true,
        });
      })
      .catch((err: AxiosError) => {
        console.log("error: login required!");
      });
  };

  const notify = (username: string) =>
    toast(
      <div>
        <p>
          <strong>{username}</strong> has sent you a friend request
        </p>
        <div className="flex justify-around">
          <button
            className="text-green-800"
            onClick={() => {
              acceptRequest(username);
            }}>
            Accept
          </button>
          <button className="text-red-800">Refuse</button>
        </div>
      </div>
    );

  useEffect(() => {
    socket?.on("on-friend-request", (username) => {
      notify(username);
    });

    return () => {
      socket?.off("on-friend-request");
    };
  }, [socket]);

  return (
    <div>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default FriendNotifications;
