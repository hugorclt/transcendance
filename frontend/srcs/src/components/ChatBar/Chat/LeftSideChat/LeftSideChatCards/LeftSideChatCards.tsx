import React, { useContext, useEffect, useState } from "react";
import { COLORS, convertStatusColor } from "../../../../../colors";
import { ProfileBoxStatus } from "../../../ProfilBox/ProfilBoxStyle";
import {
  ChatManagerNameStatus,
  ChatManagerUserName,
  LeftSideChatCardsRightBox,
  UserChatManagerBox,
} from "./LeftSideChatCardsStyle";
import { FaCrown } from "react-icons/fa";
import { TbSword } from "react-icons/tb";
import { GlobalContext } from "../../../../../services/Global/GlobalProvider";
import Popup from "reactjs-popup";
import {
  FriendsPopUpButton,
  InsidePopUpButton,
  PopUpBox,
} from "../../../FriendsList/FriendsCards/FriendsCardsStyle";
import { BsThreeDotsVertical } from "react-icons/bs";
import { SocketContext } from "../../../../../services/Auth/SocketContext";
import { BiVolumeMute } from "react-icons/bi";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";

function LeftSideChatCards(props: {
  roomId: string;
  userId: string;
  name: string;
  status: string;
  role: string;
  isMute: boolean;
  isAdmin: boolean;
}) {
  const { auth } = useContext(GlobalContext);
  const socket = useContext(SocketContext);
  const axiosPrivate = useAxiosPrivate();

  function displayRole(role: string) {
    if (role == "ADMIN")
      return <TbSword style={{ color: COLORS.secondary }} size={22} />;
    else if (role == "OWNER")
      return <FaCrown style={{ color: COLORS.secondary }} size={22} />;
  }

  const handleClick = () => {
    socket?.emit("friend-request", props.name);
  };

  const handleKick = () => {
    axiosPrivate.post("/rooms/kick", {
      userId: props.userId,
      roomId: props.roomId,
    });
  };

  const handleMute = () => {
    axiosPrivate.post("rooms/mute", {
      userId: props.userId,
      roomId: props.roomId,
      isMute: props.isMute
    });
  };

  return (
    <UserChatManagerBox>
      <ChatManagerNameStatus>
        <ChatManagerUserName>
          {auth.username == props.name ? "YOU" : props.name.toLocaleUpperCase()}
        </ChatManagerUserName>
        <ProfileBoxStatus
          style={{ backgroundColor: convertStatusColor(props.status) }}
        />
      </ChatManagerNameStatus>
      <LeftSideChatCardsRightBox>
        {displayRole(props.role)}
        {props.isMute == true && (
          <BiVolumeMute style={{ color: COLORS.secondary }} size={22} />
        )}
        <Popup
          position="left center"
          arrowStyle={{ color: COLORS.background }}
          trigger={
            <FriendsPopUpButton>
              <BsThreeDotsVertical
                style={{ opacity: "50%", color: COLORS.primary }}
                size={22}
              />
            </FriendsPopUpButton>
          }>
          <PopUpBox>
            <InsidePopUpButton onClick={handleClick}>
              Add to friends
            </InsidePopUpButton>
            <InsidePopUpButton>Block user</InsidePopUpButton>
            {props.isAdmin ? (
              <>
                <InsidePopUpButton onClick={handleMute}>
                  {props.isMute ? "Unmute user" : "Mute user"}
                </InsidePopUpButton>
                <InsidePopUpButton onClick={handleKick}>
                  Kick user
                </InsidePopUpButton>
                <InsidePopUpButton>Ban user</InsidePopUpButton>
              </>
            ) : (
              ""
            )}
          </PopUpBox>
        </Popup>
      </LeftSideChatCardsRightBox>
    </UserChatManagerBox>
  );
}

export default LeftSideChatCards;
