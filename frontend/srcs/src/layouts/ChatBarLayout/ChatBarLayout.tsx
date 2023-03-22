import React from "react";
import FriendsList from "../../components/ChatBar/FriendsList/FriendsList";
import ProfilBox from "../../components/ChatBar/ProfilBox/ProfilBox";
import FriendNotifications from "../../components/ChatBar/FriendsList/FriendNotifications/FriendsNotifications";
import FriendsTopBar from "../../components/ChatBar/FriendsList/FriendsTopBar/FriendsTopBar";
import { ProfilBoxContainer, ChatBarContainer } from "./ChatBarStyle";
import ChatHistory from "../../components/ChatBar/ChatHistory/ChatHistory";
import BottomBar from "../../components/ChatBar/BottomBar/BottomBar";
import ChatBox from "../../components/ChatBar/Chat/ChatBox";

function ChatBarLayout() {
  return (
    <ChatBarContainer>
      <ProfilBoxContainer>
        <ProfilBox />
      </ProfilBoxContainer>
      <FriendsTopBar />
      <FriendsList />
      <ChatHistory />
      <FriendNotifications />
      <BottomBar />
      <ChatBox />
    </ChatBarContainer>
  );
}

export default ChatBarLayout;
