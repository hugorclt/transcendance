import React, { useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons/lib";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { CreateRoomContext } from "../../../views/ChatPage/CreateRoomContext";
import { ChatHistoryContext } from "../../../views/ChatPage/ChatHistoryContext";
import ChatCards from "./ChatCards/ChatCards";
import { ChatSocketContext } from "../../../views/ChatPage/ChatSocketContext";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ChatHistoryBox, ChatHistoryTopBar, ChatHistoryTopBarTitle } from "./ChatHistoryStyle";
import { COLORS } from "../../../colors";
import logo42 from '../../../assets/images/42.jpg'
import { nanoid } from "nanoid";

function ChatHistory() {
  const { isActive, setIsActive } = useContext(CreateRoomContext);
  const { chatHistory, setChatHistory } = useContext(ChatHistoryContext);
  const socket = useContext(ChatSocketContext);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get("/rooms/history").then((res) => {
      console.log(res.data);
      setChatHistory(res.data);
    });
  }, []);

  return (
    <>
      <ChatHistoryTopBar>
        <ChatHistoryTopBarTitle>Conversation</ChatHistoryTopBarTitle>
        <BiMessageRoundedAdd size={22} style={{ color: COLORS.secondary }} />
      </ChatHistoryTopBar>
      <ChatHistoryBox>
        {chatHistory.map((val) => {
          return (
            <ChatCards key={nanoid()} avatar={val.avatar} roomName={val.name} lastMessage={val.lastMessage}/>
          )
        })}
      </ChatHistoryBox>
    </>
  );
}

export default ChatHistory;
