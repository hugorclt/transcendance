import { useAtom } from "jotai";
import React, { useContext } from "react";
import Chat from "./Chat";
import { conversationAtom } from "../../../services/store";
import { TConversation } from "../../../services/type";
import { ChatContainer } from "./ChatStyle";

function ChatBox() {
  const [chat, setChat] = useAtom(conversationAtom);

  function selectActiveChat() {
    const index = chat.findIndex((elem) => elem.isActive == true);
    if (index > -1) {
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
