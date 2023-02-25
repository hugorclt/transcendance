import { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState, useContext } from "react";
import { axiosPrivate } from "../../../services/axios";
import FriendsCards from "./FriendsCards/FriendsCards";
import ManageBar from "./ManageBar";
import { StatusContext } from "../../../statusPageContext";
import { TFriendsProps } from "./FriendsCards/FriendsType";

function FriendsList() {
  const [friendList, setFriendList] = useState<TFriendsProps[]>([]);
  const socket = useContext(StatusContext);

  useEffect(() => {
    axiosPrivate
      .get("friendship/friends")
      .then((res: AxiosResponse) => {
        const friends = res.data.map((element: any) => ({
          name: element.username,
          avatar: element.avatar,
          status: element.status,
        }));
        setFriendList(friends);
      })
      .catch((err: AxiosError) => {
        console.log("Error while fetching friendlist");
      });

    socket?.on("on-status-update", (new_status_update) => {
      console.log(new_status_update);
      setFriendList((prev) => [
        {
          avatar: new_status_update.avatar,
          name: new_status_update.username,
          status: new_status_update.status,
        },
      ]);
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
            key={index}
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
