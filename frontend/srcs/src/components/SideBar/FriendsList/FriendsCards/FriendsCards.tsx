import React, { useState } from "react";
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
import { TFriendCardsProps } from "./FriendsCardsType";
import { getImageBase64 } from "../../../../services/utils/getImageBase64";
import { useAtom } from "jotai";
import {
  conversationAtom,
  friendAtom,
  lobbyAtom,
} from "../../../../services/store";
import { updateArray } from "../../../../services/utils/updateArray";

function FriendsCards({ friend }: TFriendCardsProps) {
  const axiosPrivate = useAxiosPrivate();
  const [friendList, setFriendList] = useAtom(friendAtom);
  const [chat, setChat] = useAtom(conversationAtom);
  const [lobby, setLobby] = useAtom(lobbyAtom);

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
        users: [{ userId: friend.id, role: "BASIC" }],
        isPrivate: false,
        isDm: true,
      })
      .then((res: AxiosResponse) => {
        setChat((prev) => updateArray(prev, res.data));
      })
      .catch((err: AxiosError) => {
        console.log("error while creating the room");
      });
  };

  const handleBlock = () => {
    axiosPrivate
      .post("/users/block", {
        id: friend.id,
      })
      .then((res: AxiosResponse) => {
        setFriendList((prev) => prev.filter((user) => user.id != friend.id));
      });
  };

  const spectateGame = () => {
    axiosPrivate
      .get(`/lobbies/${friend.id}/spectate`)
      .then((response: AxiosResponse) => {
        console.log(JSON.stringify(response.data));
        setLobby((prev) => ({ ...prev, ...response.data }));
      })
      .catch((error: AxiosError) => {
        console.log(JSON.stringify(error.message));
      });
  };

  return (
    <FriendsCardsBox>
      <LeftFriendsCardsBox>
        <FriendsCardsAvatar src={getImageBase64(friend.avatar)} />
        <MiddleFriendsCardsBox>
          <FriendsCardsName>
            <FriendsCardsStatusRound
              style={{ backgroundColor: convertStatusColor(friend.status) }}
            />
            {friend?.username.length > 8
              ? friend?.username.substring(0, 8).concat("...")
              : friend?.username.toLocaleUpperCase()}
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
          <InsidePopUpButton onClick={handleBlock}>
            Block friends
          </InsidePopUpButton>
          <InsidePopUpButton onClick={handleRemove}>
            Remove friends
          </InsidePopUpButton>
          {friend.status == "GAME" && (
            <InsidePopUpButton onClick={spectateGame}>
              Spectate
            </InsidePopUpButton>
          )}
        </PopUpBox>
      </Popup>
    </FriendsCardsBox>
  );
}

export default FriendsCards;
