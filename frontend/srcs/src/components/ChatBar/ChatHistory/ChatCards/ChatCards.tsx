import React, { useContext, useEffect } from "react";
import { ChatContext } from "../../../../views/ChatPage/ChatContext";
import { ChatCardsBox, ChatCardsLastMessage, ChatCardsMiddle, ChatCardsName, ChatCardsRoundedAvatar } from "./ChatCardsStyle";

function ChatCards(props: {
  avatar: string;
  lastMessage: string;
  roomName: string;
}) {
  const { openChat, setOpenChat } = useContext(ChatContext);

  const addChatToTab = () => {
    if (openChat == props.roomName)
      setOpenChat("")
    else
      setOpenChat(props.roomName)
  };
  return (
    <ChatCardsBox onClick={addChatToTab}>
      <ChatCardsRoundedAvatar src={props.avatar}/>
      <ChatCardsMiddle>
        <ChatCardsName>{props.roomName}</ChatCardsName>
        <ChatCardsLastMessage>{props.lastMessage.length >= 20 ? props.lastMessage.substring(0, 20) + "..." : props.lastMessage}</ChatCardsLastMessage>
      </ChatCardsMiddle>
    </ChatCardsBox>
  );
}

export default ChatCards;
