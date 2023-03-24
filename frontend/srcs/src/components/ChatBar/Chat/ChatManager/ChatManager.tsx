import React from "react";
import { ModalBox } from "../../FriendsList/FriendsTopBar/FriendsTopBarStyle";
import ChangePassword from "./ChangePassword";
import Unban from "./Unban";

function ChatManager() {
  return (
    <ModalBox style={{ display: "flex" }}>
      <ChangePassword />
      <Unban />
    </ModalBox>
  );
}

export default ChatManager;
