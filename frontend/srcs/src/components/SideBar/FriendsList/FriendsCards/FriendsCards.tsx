import React, { useRef, useState } from "react";
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
import { useNavigate } from "react-router";

function FriendsCards({ friend }: TFriendCardsProps) {
  const axiosPrivate = useAxiosPrivate();
  const [friendList, setFriendList] = useAtom(friendAtom);
  const [chat, setChat] = useAtom(conversationAtom);
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const ref = useRef<any>();
  const navigate = useNavigate();

  const handleRemove = () => {
    axiosPrivate
      .post("/users/friends/remove", { usernameToRemove: friend.username })
      .then((res: AxiosResponse) => {})
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
        closeTooltip();
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

  const viewProfil = () => {
    navigate(`/profile/${friend.username}`, { replace: true });
    closeTooltip();
  };

  const closeTooltip = () => ref.current!.close();

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
        ref={ref}
        position="left center"
        arrowStyle={{ color: COLORS.background }}
        trigger={
          <FriendsPopUpButton >
            <BsThreeDotsVertical
              style={{
                opacity: "50%",
                color: COLORS.primary,
                cursor: "pointer",
              }}
              size={22}
            />
          </FriendsPopUpButton>
        }>
        <PopUpBox>
          <InsidePopUpButton style={{ cursor: "pointer" }} onClick={handleChat}>
            Send message
          </InsidePopUpButton>
          <InsidePopUpButton
            style={{ cursor: "pointer" }}
            onClick={handleBlock}>
            Block friends
          </InsidePopUpButton>
          <InsidePopUpButton
            style={{ cursor: "pointer" }}
            onClick={handleRemove}>
            Remove friends
          </InsidePopUpButton>
          <InsidePopUpButton
            style={{ cursor: "pointer" }}
            onClick={viewProfil}>
            Profile
          </InsidePopUpButton>
          {friend.status == "GAME" && (
            <InsidePopUpButton
              style={{ cursor: "pointer" }}
              onClick={spectateGame}>
              Spectate
            </InsidePopUpButton>
          )}
        </PopUpBox>
      </Popup>
    </FriendsCardsBox>
  );
}

export default FriendsCards;
