import { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useContext } from "react";
import { axiosPrivate } from "../../../services/axios";
import { nanoid } from "nanoid";
import { SocketContext } from "../../../services/Auth/SocketContext";
import { FriendsListContext } from "../../../views/ChatPage/FriendsListContext";
import logo42 from "../../../assets/images/42.jpg";
import FriendsCards from "./FriendsCards/FriendsCards";
import { FriendsListBox } from "./FriendsListStyle";

function FriendsList() {
  const { friendList, setFriendList } = useContext(FriendsListContext);
  const socket = useContext(SocketContext);

  function updateFriendList(status: string, username: string, avatar: string) {
    setFriendList((prev) => {
      const index = prev.findIndex((friend) => friend.name === username);
      if (index !== -1) {
        const updatedFriend = { ...prev[index], status: status, avatar: avatar, key: nanoid() };
        return [
          ...prev.slice(0, index),
          updatedFriend,
          ...prev.slice(index + 1),
        ];
      } else {
        return [
          ...prev,
          { key: nanoid(), name: username, status: status, avatar: avatar},
        ];
      }
    });
  }

  useEffect(() => {
    axiosPrivate
      .get("users/friends")
      .then((res: AxiosResponse) => {
        const friends = res.data.map((element: any) => ({
          name: element.username,
          avatar: element.avatar,
          status: element.status,
          key: nanoid(),
        }));
        console.log(friends);
        setFriendList(friends);
      })
      .catch((err: AxiosError) => {
        console.log("Error while fetching friendlist");
      });

    socket?.on("on-status-update", (newStatus) => {
      updateFriendList(
        newStatus.status,
        newStatus.username,
        newStatus.avatar,
      );
    });
    return () => {
      socket?.off("on-status-update");
    };
  }, [socket]);

  return (
    <FriendsListBox>
      {friendList.map((val, index) => {
      return (
        <FriendsCards
          key={nanoid()}
          avatar={val.avatar}
          name={val.name}
          status={val.status}
        />
      );
      })}
    </FriendsListBox>
  );
}

export default FriendsList;
