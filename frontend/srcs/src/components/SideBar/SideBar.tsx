import React from "react";
import { ChatBarContainer, ProfilBoxContainer } from "./SideBar.style";
import ProfilBox from "./ProfileBox/ProfilBox";
import FriendsTopBar from "./FriendsList/FriendsTopBar/FriendsTopBar";
import FriendsList from "./FriendsList/FriendsList";
import FriendNotifications from "./FriendsList/FriendNotifications/FriendsNotifications";
import ChatHistory from "./ChatHistory/ChatHistory";
import BottomBar from "./BottomBar/BottomBar";
import ChatBox from "./Chat/ChatBox";
import MediaQuery from "react-responsive";
import { mediaSize } from "../../mediaSize";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { COLORS } from "../../colors";
import { useAtom } from "jotai";
import { sideBarAtom } from "../../services/store";

function SideBar() {
  const [sideBar, setSideBar] = useAtom(sideBarAtom)

  return (
    <ChatBarContainer>
      <MediaQuery maxWidth={mediaSize.laptop}>
        <AiOutlineArrowLeft onClick={() => setSideBar(false)} style={{margin: "16px 16px -10px 16px"}} color={COLORS.secondary} size={24}/>
      </MediaQuery>
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
