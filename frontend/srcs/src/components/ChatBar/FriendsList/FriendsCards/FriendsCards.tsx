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

function FriendsCards(props: TFriendsProps) {
  const [color, setColor] = useState("");
  const [openDD, setOpenDD] = useState(false);
  const { setOpenChat } = useContext(ChatContext);

  useEffect(() => {
    setColor(convertStatusColor(props.status));
  }, []);

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
        }
      >
        <PopUpBox>
          <InsidePopUpButton
            onClick={() => {
              setOpenChat(props.name);
            }}
          >
            Send message
          </InsidePopUpButton>
          <InsidePopUpButton>Block friends</InsidePopUpButton>
          <InsidePopUpButton>Remove friends</InsidePopUpButton>
        </PopUpBox>
      </Popup>
    </FriendsCardsBox>
  );
}

export default FriendsCards;
