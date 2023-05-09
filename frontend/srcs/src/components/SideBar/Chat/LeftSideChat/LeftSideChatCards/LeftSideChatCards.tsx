import React, { useContext, useEffect, useState } from "react";
import { COLORS, convertStatusColor } from "../../../../../colors";
import { ProfileBoxStatus } from "../../../ProfileBox/ProfilBoxStyle";
import {
  ChatManagerNameStatus,
  ChatManagerUserName,
  LeftSideChatCardsRightBox,
  UserChatManagerBox,
} from "./LeftSideChatCardsStyle";
import { FaCrown } from "react-icons/fa";
import { TbSword } from "react-icons/tb";
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
import AdminInteraction from "./AdminInteraction";
import { useAtom } from "jotai";
import { friendAtom, userAtom } from "../../../../../services/store";
import { useNavigate } from "react-router";
import { AxiosResponse } from "axios";

function LeftSideChatCards(props: {
  roomId: string;
  userId: string;
  name: string;
  status: string;
  role: string;
  mute: Date;
  isAdmin: boolean;
}) {
  const [user, setUser] = useAtom(userAtom);
  const socket = useContext(SocketContext);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [friendList, setFriendList] = useAtom(friendAtom);

  function displayRole(role: string) {
    if (role == "ADMIN")
      return <TbSword style={{ color: COLORS.secondary }} size={22} />;
    else if (role == "OWNER")
      return <FaCrown style={{ color: COLORS.secondary }} size={22} />;
  }

  const handleClick = () => {
    socket?.emit("friend-request", props.name);
  };

  const handleProfil = () => {
    navigate(`/profile/${props.name}`, { replace: true });
  };

  const handleBlock = () => {
    axiosPrivate
      .post("/users/block", {
        id: props.userId,
      })
      .then((res: AxiosResponse) => {
        setFriendList((prev) => prev.filter((user) => user.id != props.userId));
      });
  };

  return (
    <UserChatManagerBox>
      <ChatManagerNameStatus>
        <ChatManagerUserName>
          {user.username == props.name ? "YOU" : props.name.toLocaleUpperCase()}
        </ChatManagerUserName>
        <ProfileBoxStatus
          style={{ backgroundColor: convertStatusColor(props.status) }}
        />
      </ChatManagerNameStatus>
      <LeftSideChatCardsRightBox>
        {displayRole(props.role)}
        <Popup
          position="left center"
          arrowStyle={{ color: COLORS.background }}
          trigger={
            <FriendsPopUpButton>
              {user.username == props.name ? (
                <></>
              ) : (
                <BsThreeDotsVertical
                  style={{ color: COLORS.primary }}
                  size={22}
                />
              )}
            </FriendsPopUpButton>
          }>
          <PopUpBox>
            <InsidePopUpButton onClick={handleClick}>
              Add to friends
            </InsidePopUpButton>
            <InsidePopUpButton onClick={handleBlock}>
              Block user
            </InsidePopUpButton>
            <InsidePopUpButton onClick={handleProfil}>
              View profile
            </InsidePopUpButton>
            {props.isAdmin ? (
              <AdminInteraction
                userId={props.userId}
                roomId={props.roomId}
                mute={props.mute}
              />
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
