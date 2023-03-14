import React, { useContext, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ChatContext } from "../../../../views/ChatPage/ChatContext";
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
import { TFriend } from "../../../../views/MainPage/MainContextTypes";

function FriendsCards(props: TFriend) {
  const [color, setColor] = useState("");
  const { setOpenChat } = useContext(ChatContext);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setColor(convertStatusColor(props.status));
  }, []);

  const handleRemove = () => {
    axiosPrivate
      .post("/users/friends/remove", { usernameToRemove: props.username })
      .then((res: AxiosResponse) => console.log("user succesfully removed"))
      .catch((err: AxiosError) => console.log("failed to remove", err));
  };

  return (
    <FriendsCardsBox>
      <LeftFriendsCardsBox>
        <FriendsCardsAvatar src="" /> {/* toaddavatar */}
        <MiddleFriendsCardsBox>
          <FriendsCardsName>
            <FriendsCardsStatusRound style={{ backgroundColor: color }} />
            {props.username.toLocaleUpperCase()}
          </FriendsCardsName>
          <FriendsCardsStatus>
            {props.status.toLocaleUpperCase()}
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
          <InsidePopUpButton
            onClick={() => {
              setOpenChat(props.username);
            }}
          >
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
