import React, { useContext } from "react";
import { ChatContainer } from "../../../layouts/ChatBarLayout/ChatBarStyle";
import { ChatContext } from "../../../views/ChatPage/ChatContext";
import Chat from "./Chat";

function ChatBox() {
  const { openChat } = useContext(ChatContext);

  return openChat.length == 0 ? (
    <></>
  ) : (
    <ChatContainer>
      <Chat name={openChat} />
    </ChatContainer>
  );
}

export default ChatBox;
