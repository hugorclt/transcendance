import React from "react";
import FriendsList from "../../components/ChatBar/FriendsList/FriendsList";
import ProfilBox from "../../components/ChatBar/ProfilBox/ProfilBox";
import FriendNotifications from "../../components/ChatBar/FriendsList/FriendNotifications/FriendsNotifications";
import Chat from "../../components/ChatBar/Chat/Chat";
import ChatHistory from "../../components/ChatBar/RoomCard/RoomCard";
import ManageBar from "../../components/ChatBar/FriendsList/ManageBar";
import {
  ProfilBoxContainer,
  FriendListContainer,
  ChatHistoryContainer,
  ChatContainer,
  ChatBox,
} from "./ChatBarStyle";

function ChatBarLayout() {
  return (
    <>
      <ChatContainer>
        <ProfilBoxContainer>
          <ProfilBox />
        </ProfilBoxContainer>
        {/* <ManageBar /> */}
        {/* <FriendsList /> */}
        {/* <ChatHistory /> */}
        {/* <FriendNotifications /> */}
        {/* <Chat /> */}
      </ChatContainer>
    </>
  );
}

export default ChatBarLayout;
