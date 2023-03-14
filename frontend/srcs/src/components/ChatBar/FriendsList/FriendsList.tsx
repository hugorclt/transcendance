import { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useContext } from "react";
import { axiosPrivate } from "../../../services/axios";
import { nanoid } from "nanoid";
import { SocketContext } from "../../../services/Auth/SocketContext";
import { FriendsListContext } from "../../../views/ChatPage/FriendsListContext";
import FriendsCards from "./FriendsCards/FriendsCards";
import { FriendsListBox } from "./FriendsListStyle";
import { useAtom } from "jotai";
import { friendAtom } from "../../../services/store";
import { TFriend } from "../../../services/type";

function FriendsList() {
  const [friendList, setFriendList] = useAtom(friendAtom);

  return (
    <FriendsListBox>
      {friendList.map((val: TFriend) => {
        return (
          <FriendsCards
            key={val.id}
            avatar={val.avatar}
            name={val.username}
            status={val.status}
          />
        );
      })}
    </FriendsListBox>
  );
}

export default FriendsList;
