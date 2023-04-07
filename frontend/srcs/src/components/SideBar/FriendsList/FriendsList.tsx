import React from "react";
import FriendsCards from "./FriendsCards/FriendsCards";
import { FriendsListBox } from "./FriendsListStyle";
import { useAtom } from "jotai";
import { friendAtom, searchUserAtom } from "../../../services/store";
import { TFriend } from "../../../services/type";

function FriendsList() {
  const [friendList, setFriendList] = useAtom(friendAtom);
  const [searchFriend, setSearchFriends] = useAtom(searchUserAtom);

  return (
    <FriendsListBox>
      {friendList.map((val: TFriend) => {
        if (searchFriend != "" && !val.username.toLocaleUpperCase().includes(searchFriend.toLocaleUpperCase())) return ;
        return <FriendsCards key={val.id} friend={val} />;
      })}
    </FriendsListBox>
  );
}

export default FriendsList;
