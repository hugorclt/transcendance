import React, { createContext, Dispatch } from "react";
import { TFriendsProps } from "../../components/ChatBar/FriendsList/FriendsCards/FriendsType";

const defaultValue = {
  friendList: [],
  setFriendList: () => {},
};

type TFriendsList = {
    friendList: TFriendsProps[];
    setFriendList: Dispatch<React.SetStateAction<TFriendsProps[]>>;
};

export const FriendsListContext = createContext<TFriendsList>(defaultValue);
