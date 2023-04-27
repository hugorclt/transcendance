import React, { useState } from "react";
import { axiosPrivate } from "../../../../../services/axios";
import { InsidePopUpButton } from "../../../FriendsList/FriendsCards/FriendsCardsStyle";
import { InputRange, SliderContainer } from "./LeftSideChatCardsStyle";

interface TAdminInteractionProps {
  userId: string;
  roomId: string;
  mute: Date;
}

function AdminInteraction(props: TAdminInteractionProps) {
  const [sliderValue, setSliderValue] = useState(1);

  const handleKick = () => {
    axiosPrivate.post("/rooms/kick", {
      targetId: props.userId,
      roomId: props.roomId,
    });
  };

  const handleMute = () => {
    axiosPrivate.post("rooms/mute", {
      targetId: props.userId,
      roomId: props.roomId,
      time: sliderValue,
    });
  };

  const handleBan = () => {
    axiosPrivate
      .post("rooms/ban", {
        targetId: props.userId,
        roomId: props.roomId,
      })
      .then(() => {});
  };
  return (
    <>
      <InsidePopUpButton onClick={handleMute}>
        {"Mute user"}
      </InsidePopUpButton>
      <SliderContainer>
        <InputRange
          type="range"
          min="1"
          max="20"
          value={sliderValue}
          onInput={(e) => {
            setSliderValue(parseInt((e.target as HTMLInputElement).value));
          }}
          id="myRange"
        />
        <p>{sliderValue + "min"}</p>
      </SliderContainer>
      <InsidePopUpButton onClick={handleKick}>Kick user</InsidePopUpButton>
      <InsidePopUpButton onClick={handleBan}>Ban user</InsidePopUpButton>
    </>
  );
}

export default AdminInteraction;
