import React, { useState } from "react";
import { TFriendsProps } from "../../components/ChatBar/FriendsList/FriendsCards/FriendsType";
import ChatBar from "../../layouts/ChatBarLayout/ChatBarLayout";
import { ChatContext } from "./ChatContext";
import { ChatHistoryContext, TChatHistoryType } from "./ChatHistoryContext";
import { ChatManagerOpen } from "./ChatManagerOpen";
import { CreateRoomContext } from "./CreateRoomContext";
import { FriendsListContext } from "./FriendsListContext";
import { RoomModalOpenContext } from "./RoomModalOpenContext";
function ChatPage() {
  const [openChat, setOpenChat] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [openManager, setOpenManager] = useState<boolean>(false);
  const [friendList, setFriendList] = useState<TFriendsProps[]>([]);
  const [chatHistory, setChatHistory] = useState<TChatHistoryType[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <ChatContext.Provider value={{ openChat, setOpenChat }}>
      <CreateRoomContext.Provider value={{ isActive, setIsActive }}>
        <FriendsListContext.Provider value={{ friendList, setFriendList }}>
          <ChatHistoryContext.Provider value={{ chatHistory, setChatHistory }}>
            <RoomModalOpenContext.Provider value={{ open, setOpen }}>
              <ChatManagerOpen.Provider value={{ openManager, setOpenManager }}>
                <ChatBar />
              </ChatManagerOpen.Provider>
            </RoomModalOpenContext.Provider>
          </ChatHistoryContext.Provider>
        </FriendsListContext.Provider>
      </CreateRoomContext.Provider>
    </ChatContext.Provider>
  );
}

export default ChatPage;
