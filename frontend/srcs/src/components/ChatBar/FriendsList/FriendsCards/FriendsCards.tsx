import React, { useContext, useEffect, useState } from "react";
import { TFriendsProps } from "./FriendsType";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
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

function FriendsCards(props: TFriendsProps) {
  const [color, setColor] = useState("");
  const { setOpenChat } = useContext(ChatContext);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setColor(convertStatusColor(props.status));
  }, []);

  const handleRemove = () => {
    axiosPrivate
      .post("/users/friends/remove", { usernameToRemove: props.name })
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
            {props.name.toLocaleUpperCase()}
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
        }>
        <PopUpBox>
          <InsidePopUpButton
            onClick={() => {
              setOpenChat(props.name);
            }}>
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
