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
      <div className="shadow-md bg-dark-blue h-screen w-full">
        <div className="pt-4 pb-2 px-6">
          <ProfilBox />
        </div>
        <div className="bg-gold h-px" />
        <ManageBar />
        <div className="overflow-y-scroll h-96 scrollbar-hide">
          <FriendsList />
        </div>
        <div className="overflow-y-scroll scrollbar-hide">
          <ChatHistory />
        </div>
        <FriendNotifications />
      </div>
      <Chat />
    </>
  );
}

export default ChatBar;
