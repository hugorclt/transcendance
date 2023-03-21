import { useAtom } from "jotai";
import React, { useContext } from "react";
import { ChatContainer } from "../../../layouts/ChatBarLayout/ChatBarStyle";
import Chat from "./Chat";
import { conversationAtom } from "../../../services/store";
import { TConversation } from "../../../services/type";

function ChatBox() {
  const [chat, setChat] = useAtom(conversationAtom);

  function selectActiveChat() {
    const index = chat.findIndex((elem) => elem.isActive == true);
    console.log(index);
    if (index > -1) {
      console.log("oui");
      return (
        <ChatContainer>
          <Chat chat={chat[index]} />
        </ChatContainer>
      );
    }
    return <></>;
  }

  return selectActiveChat();
}

export default ChatBox;
