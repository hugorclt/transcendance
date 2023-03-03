import React, { useContext, useState } from "react";
import { FriendsListContext } from "../../../../../views/ChatPage/FriendsListContext";

function CreateRoomCard() {
  const { friendList } = useContext(FriendsListContext);
  
  return (
    <>
      <div>
        {friendList.map((friend) => {
          return <h2>{friend.name}</h2>;
        })}
      </div>
    </>
  );
}

export default CreateRoomCard;
