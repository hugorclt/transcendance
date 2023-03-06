import React, { useState } from "react";
import FriendsList from "../../components/ChatBar/FriendsList/FriendsList";
import ProfilBox from "../../components/ChatBar/ProfilBox/ProfilBox";
import FriendNotifications from "../../components/ChatBar/FriendsList/FriendNotifications/FriendsNotifications";
import Chat from "../../components/ChatBar/Chat/Chat";
import ChatHistory from "../../components/ChatBar/RoomCard/RoomCard";
import ManageBar from "../../components/ChatBar/FriendsList/ManageBar";

function ChatBarLayout() {
  return (
    <>
      <div className="shadow-md bg-dark-blue h-screen w-full flex flex-col">
        <div className="pt-4 pb-2 px-6 flex-shrink-0 1/6">
          <ProfilBox />
        </div>
        <div className="bg-gold h-px flex-shrink-0" />
        <ManageBar />
        <div className="overflow-y-scroll scrollbar-hide h-3/6">
          <FriendsList />
        </div>
        <div className="bg-gold h-0.5" />
        <div className="h-2/6">
          <ChatHistory />
        </div>
        <FriendNotifications />
      </div>
      <Chat />
    </>
  );
}

export default ChatBarLayout;
