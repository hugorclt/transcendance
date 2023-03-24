import React, { useState } from "react";
import { axiosPrivate } from "../../../../../services/axios";
import { InsidePopUpButton } from "../../../FriendsList/FriendsCards/FriendsCardsStyle";
import { InputRange, SliderContainer } from "./LeftSideChatCardsStyle";

interface TAdminInteractionProps {
  userId: string;
  roomId: string;
  isMute: boolean;
}

function AdminInteraction(props: TAdminInteractionProps) {
  const [sliderValue, setSliderValue] = useState(1);

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
      isMute: props.isMute,
      time: sliderValue,
    });
  };

  const handleBan = () => {
    axiosPrivate.post("rooms/ban", {
      userId: props.userId,
      roomId: props.roomId,
    });
  };
  return (
    <>
      <InsidePopUpButton onClick={handleMute}>
        {props.isMute ? "Unmute user" : "Mute user"}
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
