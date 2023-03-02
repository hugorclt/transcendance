import React, { useState } from "react";
import FriendsList from "./FriendsList/FriendsList";
import ProfilBox from "./ProfilBox/ProfilBox";
import FriendNotifications from "./FriendsList/FriendNotifications/FriendsNotifications";
import Chat from "./Chat/Chat";
import ChatHistory from "./ChatHistory/ChatHistory";
import ManageBar from "./FriendsList/ManageBar";

function ChatBar() {
  return (
    <>
      <div className="shadow-md bg-dark-blue h-screen w-full flex flex-col">
        <div className="pt-4 pb-2 px-6 flex-shrink-0">
          <ProfilBox />
        </div>
        <div className="bg-gold h-px flex-shrink-0" />
        <ManageBar />
        <div className="overflow-y-scroll scrollbar-hide h-5/6">
          <FriendsList />
        </div>
        <div className="bg-gold h-px" />
        <div className="overflow-y-scroll scrollbar-hide h-1/2 screen:h-5/6">
          <ChatHistory />
        </div>
        <FriendNotifications />
      </div>
      <Chat />
    </>
  );
}

export default ChatBar;
