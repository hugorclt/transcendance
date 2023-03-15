import { useAtom } from "jotai";
import React, { useContext } from "react";
import { ChatContainer } from "../../../layouts/ChatBarLayout/ChatBarStyle";
import { ChatContext } from "../../../views/ChatPage/ChatContext";
import Chat from "./Chat";
import { activeChat } from "../../../services/store";

function ChatBox() {
  const [openChat] = useAtom(activeChat);

  return openChat.id == "" ? (
    <></>
  ) : (
    <ChatContainer>
      <Chat chat={openChat} />
    </ChatContainer>
  );
}

export default ChatBox;
