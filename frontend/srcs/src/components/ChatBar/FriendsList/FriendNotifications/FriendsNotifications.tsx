import React, { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChatSocketContext } from "../../../../views/ChatPage/ChatSocketContext";

function FriendNotifications() {
  const socket = useContext(ChatSocketContext);

  const acceptRequest = (username: string) => {
    socket?.emit("friend-request-reply", {
      fromUsername: username,
      isReplyTrue: true,
    });
  };

  const notify = (username: string) =>
    toast(
      <>
        <p>
          <strong>{username}</strong> has sent you a friend request
        </p>
        <div className="flex justify-around">
          <button
            className="text-green-800"
            onClick={() => {
              acceptRequest(username);
            }}
          >
            Accept
          </button>
          <button className="text-red-800">Refuse</button>
        </div>
      </>
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
