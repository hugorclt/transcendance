import React from "react";
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
        return <FriendsCards key={val.id} friend={val} />;
      })}
    </FriendsListBox>
  );
}

export default FriendsList;
