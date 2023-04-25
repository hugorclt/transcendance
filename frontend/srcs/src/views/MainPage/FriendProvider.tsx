import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { ReactNode, useContext, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { SocketContext } from "../../services/Auth/SocketContext";
import { friendAtom } from "../../services/store";
import { TFriend } from "../../services/type";
import { updateArray } from "../../services/utils/updateArray";

function FriendProvider({ children }: { children: ReactNode }) {
  const [friendList, setFriendList] = useAtom(friendAtom);
  const socket = useContext(SocketContext);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get("users/friends")
      .then((res: AxiosResponse) => {
        setFriendList(res.data);
      })
      .catch((err: AxiosError) => {
        console.log("Error while fetching friendlist");
      });
  }, []);

  useEffect(() => {
    socket?.on("on-friend-remove", (friendRemoved) => {
      setFriendList((prev: TFriend[]) =>
        prev.filter((friend: TFriend) => friend.username !== friendRemoved)
      );
    });

    socket?.on("on-friend-update", (newStatus) => {
      setFriendList((prev) => updateArray(prev, newStatus));
    });
    return () => {
      socket?.off("on-friend-update");
      socket?.off("on-friend-remove");
    };
  }, [socket]);
  return <>{children}</>;
}

export default FriendProvider;
