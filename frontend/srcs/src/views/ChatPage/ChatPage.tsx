import React, { useState } from "react";
import ChatBar from "../../components/ChatBar/ChatBar";
import { ChatContext } from "./ChatContext";
import { ChatSocketProvider } from "./ChatSocketContext";
function ChatPage() {
  const [openChat, setOpenChat] = useState<string[]>([]);

  return (
    <ChatSocketProvider>
      <ChatContext.Provider value={{ openChat, setOpenChat }}>
        <ChatBar />
      </ChatContext.Provider>
    </ChatSocketProvider>
  );
}

export default ChatPage;
