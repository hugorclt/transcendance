import React, { useState } from "react";
import FriendsList from "./FriendsList/FriendsList";
import ProfilBox from "./ProfilBox/ProfilBox";
import FriendNotifications from "./FriendsList/FriendNotifications/FriendsNotifications";
import Chat from "./Chat/Chat";
import { ChatContext } from "./ChatContext";

function ChatBar() {
  const [openChat, setOpenChat] = useState<string[]>([]);

  return (
    <div>
      <ChatContext.Provider value={{ openChat, setOpenChat }}>
        <div className="shadow-md bg-dark-blue h-screen w-full">
          <div className="pt-4 pb-2 px-6">
            <ProfilBox />
          </div>
          <div className="bg-gold h-px" />
          <FriendsList />
          <FriendNotifications />
        </div>
        <Chat />
      </ChatContext.Provider>
    </div>
  );
}

export default ChatBar;
