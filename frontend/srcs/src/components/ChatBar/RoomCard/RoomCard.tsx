import React, { useContext, useState } from "react";
import ChatCards from "./ChatHistory/ChatCards/ChatCards";
import { BiMessageRoundedAdd, BiArrowBack } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import "./FlipCards.css";
import { CreateRoomContext } from "../../../views/ChatPage/CreateRoomContext";
import ChatHistory from "./ChatHistory/ChatHistory";
import CreateRoom from "./CreateRoom/CreateRoom";

function RoomCards() {
  const { isActive } = useContext(CreateRoomContext);

  return (
    <div className="w-full h-full form-card-container">
      <div
        className={
          isActive ? "px-3 h-full flip-card flipped" : "px-3 h-full flip-card"
        }>
        <ChatHistory />
        <CreateRoom />
      </div>
    </div>
  );
}

export default RoomCards;
