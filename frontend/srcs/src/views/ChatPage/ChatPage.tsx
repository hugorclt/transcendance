import React, { useState } from "react";
import { TFriendsProps } from "../../components/ChatBar/FriendsList/FriendsCards/FriendsType";
import ChatBar from "../../layouts/ChatBarLayout/ChatBarLayout";
import { ChatContext } from "./ChatContext";
import { ChatHistoryContext, TChatHistoryType } from "./ChatHistoryContext";
import { ChatSocketProvider } from "./ChatSocketContext";
import { CreateRoomContext } from "./CreateRoomContext";
import { FriendsListContext } from "./FriendsListContext";
function ChatPage() {
  const [openChat, setOpenChat] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [friendList, setFriendList] = useState<TFriendsProps[]>([]);
  const [chatHistory, setChatHistory] = useState<TChatHistoryType[]>([]);

  return (
    <ChatSocketProvider>
      <ChatContext.Provider value={{ openChat, setOpenChat }}>
        <CreateRoomContext.Provider value={{ isActive, setIsActive }}>
          <FriendsListContext.Provider value={{ friendList, setFriendList }}>
            <ChatHistoryContext.Provider value={{ chatHistory, setChatHistory }}>
              <ChatBar />
            </ChatHistoryContext.Provider>
          </FriendsListContext.Provider>
        </CreateRoomContext.Provider>
      </ChatContext.Provider>
    </ChatSocketProvider>
  );
}

export default ChatPage;
