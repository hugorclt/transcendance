import React from "react";
import { ChatBarContainer, ProfilBoxContainer } from "./SideBar.style";
import ProfilBox from "./ProfileBox/ProfilBox";
import FriendsTopBar from "./FriendsList/FriendsTopBar/FriendsTopBar";
import FriendsList from "./FriendsList/FriendsList";
import ChatHistory from "./ChatHistory/ChatHistory";
import BottomBar from "./BottomBar/BottomBar";
import ChatBox from "./Chat/ChatBox";
import MediaQuery from "react-responsive";
import { mediaSize } from "../../mediaSize";
import { AiOutlineArrowRight } from "react-icons/ai";
import { COLORS } from "../../colors";
import { useAtom } from "jotai";
import { sideBarAtom } from "../../services/store";

function SideBar() {
  const [sideBar, setSideBar] = useAtom(sideBarAtom);

  return (
    <ChatBarContainer>
      <MediaQuery maxWidth={mediaSize.laptop}>
        <div onClick={() => setSideBar(false)} style={{ cursor: "pointer" }}>
          <AiOutlineArrowRight
            style={{ margin: "16px 16px -10px 16px" }}
            color={COLORS.secondary}
            size={24}
          />
        </div>
      </MediaQuery>
      <ProfilBoxContainer>
        <ProfilBox />
      </ProfilBoxContainer>
      <FriendsTopBar />
      <FriendsList />
      <ChatHistory />
      <BottomBar />
      <ChatBox />
    </ChatBarContainer>
  );
}

export default SideBar;
