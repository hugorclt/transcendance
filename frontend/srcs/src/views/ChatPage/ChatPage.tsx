import React, { useState } from "react";
import ChatBarLayout from "../../layouts/ChatBarLayout/ChatBarLayout";
import { ChatManagerOpen } from "./ChatManagerOpen";
import { CreateRoomContext } from "./CreateRoomContext";
import { RoomModalOpenContext } from "./RoomModalOpenContext";
function ChatPage() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [openManager, setOpenManager] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  return (
      <CreateRoomContext.Provider value={{ isActive, setIsActive }}>
        <RoomModalOpenContext.Provider value={{ open, setOpen }}>
          <ChatManagerOpen.Provider value={{ openManager, setOpenManager }}>
            <ChatBarLayout />
          </ChatManagerOpen.Provider>
        </RoomModalOpenContext.Provider>
      </CreateRoomContext.Provider>
  );
}

export default ChatPage;
