import React, { useEffect, useContext } from "react";
import { nanoid } from "nanoid";
import { SocketContext } from "../../../services/Auth/SocketContext";
import FriendsCards from "./FriendsCards/FriendsCards";
import { FriendsListBox } from "./FriendsListStyle";
import { useMainContext } from "../../../views/MainPage/MainContext";
import { TFriend } from "../../../views/MainPage/MainContextTypes";

function FriendsList() {
  const { friendList, setFriendList } = useMainContext();
  const socket = useContext(SocketContext);

  function updateFriendList(status: string, username: string, avatar: string) {
    setFriendList((prev: TFriend[]) => {
      const index = prev.findIndex((friend) => friend.username === username);
      if (index !== -1) {
        const updatedFriend = {
          ...prev[index],
          status: status,
          avatar: avatar,
          key: nanoid(),
        };
        return [
          ...prev.slice(0, index),
          updatedFriend,
          ...prev.slice(index + 1),
        ];
      } else {
        return [
          ...prev,
          { key: nanoid(), username: username, status: status, avatar: avatar },
        ];
      }
    });
  }

  useEffect(() => {
    socket?.on("on-removed-friend", (friendRemoved) => {
      setFriendList((prev: TFriend[]) =>
        prev.filter((friend) => friend.username !== friendRemoved)
      );
    });

    socket?.on("on-status-update", (newStatus) => {
      updateFriendList(newStatus.status, newStatus.username, newStatus.avatar);
    });
    return () => {
      socket?.off("on-status-update");
      socket?.off("on-removed-friend");
    };
  }, [socket]);

  return (
    <FriendsListBox>
      {friendList.map((val) => {
        console.log("username: ", val.username);
        return (
          <FriendsCards
            key={nanoid()}
            id={val.id}
            avatar={val.avatar}
            username={val.username}
            status={val.status}
          />
        );
      })}
    </FriendsListBox>
  );
}

export default FriendsList;
