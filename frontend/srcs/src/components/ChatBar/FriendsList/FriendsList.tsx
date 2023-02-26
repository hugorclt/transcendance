import { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState, useContext } from "react";
import { axiosPrivate } from "../../../services/axios";
import FriendsCards from "./FriendsCards/FriendsCards";
import ManageBar from "./ManageBar";
import { StatusContext } from "../../../statusPageContext";
import { nanoid } from 'nanoid';
import { TFriendsProps } from "./FriendsCards/FriendsType";

function FriendsList() {
  const [friendList, setFriendList] = useState<TFriendsProps[]>([]);
  const socket = useContext(StatusContext);

  function updateFriendList(status: string, username: string, avatar: string) {
    setFriendList((prev) => {
      const index = prev.findIndex((friend) => friend.name === username);
      if (index !== -1) {
        const updatedFriend = { ...prev[index], status: status, key: nanoid() };
        return [
          ...prev.slice(0, index),
          updatedFriend,
          ...prev.slice(index + 1),
        ];
      } else {
        return [...prev, { key:nanoid(), name: username, avatar: avatar, status: status }];
      }
    });
  }

  useEffect(() => {
    axiosPrivate
      .get("friendship/friends")
      .then((res: AxiosResponse) => {
        const friends = res.data.map((element: any) => ({
          name: element.username,
          avatar: element.avatar,
          status: element.status,
          key:nanoid(),
        }));
        setFriendList(friends);
      })
      .catch((err: AxiosError) => {
        console.log("Error while fetching friendlist");
      });

    socket?.on("on-status-update", (new_status_update) => {
      updateFriendList(
        new_status_update.status,
        new_status_update.username,
        new_status_update.avatar
      );
    });
    return () => {
      socket?.off("on-status-update");
    };
  }, [socket]);

  return (
    <div>
      <ManageBar />
      {friendList.map((val, index) => {
        return (
          <FriendsCards
            key={val.key}
            name={val.name}
            avatar={val.avatar}
            status={val.status}
          />
        );
      })}
    </div>
  );
}

export default FriendsList;
