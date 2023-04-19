import React from "react";
import { ModalBox } from "../../FriendsList/FriendsTopBar/FriendsTopBarStyle";
import { TChatProps } from "../ChatType";
import ChatSettings from "./ChatSettings";
import Unban from "./Unban";

function ChatManager({ chat }: TChatProps) {
  return (
    <ModalBox style={{ display: "flex", height: "100%" }}>
      <ChatSettings chat={chat} />
      <Unban chat={chat} />
    </ModalBox>
  );
}

export default ChatManager;
