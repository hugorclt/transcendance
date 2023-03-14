import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { ReactNode, useContext, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { SocketContext } from "../../services/Auth/SocketContext";
import { updateFriendList } from "../../services/Friends/updateFriendList";
import { friendAtom } from "../../services/store";
import { TFriend } from "../../services/type";

function FriendProvider({ children }: { children: ReactNode }) {
  const [friendList, setFriendList] = useAtom(friendAtom);
  const socket = useContext(SocketContext);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get("users/friends")
      .then((res: AxiosResponse) => {
        console.log("data:", res.data);
        setFriendList(res.data);
      })
      .catch((err: AxiosError) => {
        console.log("Error while fetching friendlist");
      });
  }, []);

  useEffect(() => {
    socket?.on("on-removed-friend", (friendRemoved) => {
      setFriendList((prev: TFriend[]) =>
        prev.filter((friend: TFriend) => friend.username !== friendRemoved)
      );
    });

    socket?.on("on-status-update", (newStatus) => {
      console.log("status update: ", newStatus);
      setFriendList((prev) => updateFriendList(newStatus, prev));
    });
    return () => {
      socket?.off("on-status-update");
      socket?.off("on-removed-friend");
    };
  }, [socket]);
  return <>{children}</>;
}

export default FriendProvider;
