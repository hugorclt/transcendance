import React from "react";
import { ModalBox } from "../../FriendsList/FriendsTopBar/FriendsTopBarStyle";
import { TChatProps } from "../ChatType";
import ChangePassword from "./ChangePassword";
import Unban from "./Unban";

function ChatManager({chat} : TChatProps) {
  return (
    <ModalBox style={{ display: "flex" }}>
      <ChangePassword />
      <Unban chat={chat}/>
    </ModalBox>
  );
}

export default ChatManager;
