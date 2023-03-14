import React, { useState } from "react";
import ChatBarLayout from "../../layouts/ChatBarLayout/ChatBarLayout";
import { ChatContext } from "./ChatContext";
import { ChatHistoryContext, TChatHistoryType } from "./ChatHistoryContext";
import { CreateRoomContext } from "./CreateRoomContext";
import { RoomModalOpenContext } from "./RoomModalOpenContext";
function ChatPage() {
  const [openChat, setOpenChat] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<TChatHistoryType[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <ChatContext.Provider value={{ openChat, setOpenChat }}>
      <CreateRoomContext.Provider value={{ isActive, setIsActive }}>
        <ChatHistoryContext.Provider value={{ chatHistory, setChatHistory }}>
          <RoomModalOpenContext.Provider value={{ open, setOpen }}>
            <ChatBarLayout />
          </RoomModalOpenContext.Provider>
        </ChatHistoryContext.Provider>
      </CreateRoomContext.Provider>
    </ChatContext.Provider>
  );
}

export default ChatPage;
