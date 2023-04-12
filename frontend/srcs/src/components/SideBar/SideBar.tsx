import React from "react";
import { ChatBarContainer, ProfilBoxContainer } from "./SideBar.style";
import ProfilBox from "./ProfileBox/ProfilBox";
import FriendsTopBar from "./FriendsList/ManageBar/FriendsTopBar";
import FriendsList from "./FriendsList/FriendsList";
import FriendNotifications from "./FriendsList/FriendNotifications/FriendsNotifications";
import ChatHistory from "./ChatHistory/ChatHistory";
import BottomBar from "./BottomBar/BottomBar";
import ChatBox from "./Chat/ChatBox";

function SideBar() {
  return (
    <ChatBarContainer>
      <ProfilBoxContainer>
        <ProfilBox />
      </ProfilBoxContainer>
      <FriendsTopBar />
      <FriendsList />
      <FriendNotifications />
      <ChatHistory />
      <BottomBar />
      <ChatBox />
    </ChatBarContainer>
  );
}

export default SideBar;
