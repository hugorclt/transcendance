import React, { useContext, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  FriendsCardsAvatar,
  FriendsCardsBox,
  FriendsCardsName,
  FriendsCardsStatus,
  FriendsCardsStatusRound,
  FriendsPopUpButton,
  InsidePopUpButton,
  LeftFriendsCardsBox,
  MiddleFriendsCardsBox,
  PopUpBox,
} from "./FriendsCardsStyle";
import { COLORS, convertStatusColor } from "../../../../colors";
import Popup from "reactjs-popup";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import { TFriend } from "../../../../services/type";
import { useAtom } from "jotai";
import { activeChat } from "../../../../services/store";
import { TFriendCardsProps } from "./FriendsCardsType";

function FriendsCards({ friend }: TFriendCardsProps) {
  const axiosPrivate = useAxiosPrivate();

  const handleRemove = () => {
    axiosPrivate
      .post("/users/friends/remove", { usernameToRemove: friend.username })
      .then((res: AxiosResponse) => console.log("user succesfully removed"))
      .catch((err: AxiosError) => console.log("failed to remove", err));
  };

  const handleChat = () => {
    axiosPrivate
      .post("/rooms/create", {
        name: "undefined",
        password: "",
        users: [friend.username],
        isPrivate: false,
        isDm: true,
      })
      .then((res: AxiosResponse) => {
        console.log("Room succesfully created\n", res.data);
      })
      .catch((err: AxiosError) => {
        console.log("error while creating the room");
      });
  };

  return (
    <FriendsCardsBox>
      <LeftFriendsCardsBox>
        <FriendsCardsAvatar src="" /> {/* toaddavatar */}
        <MiddleFriendsCardsBox>
          <FriendsCardsName>
            <FriendsCardsStatusRound
              style={{ backgroundColor: convertStatusColor(friend.status) }}
            />
            {friend.username.toLocaleUpperCase()}
          </FriendsCardsName>
          <FriendsCardsStatus>
            {friend.status.toLocaleUpperCase()}
          </FriendsCardsStatus>
        </MiddleFriendsCardsBox>
      </LeftFriendsCardsBox>
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
        }
      >
        <PopUpBox>
          <InsidePopUpButton onClick={handleChat}>
            Send message
          </InsidePopUpButton>
          <InsidePopUpButton>Block friends</InsidePopUpButton>
          <InsidePopUpButton onClick={handleRemove}>
            Remove friends
          </InsidePopUpButton>
        </PopUpBox>
      </Popup>
    </FriendsCardsBox>
  );
}

export default FriendsCards;
