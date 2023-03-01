import React, { useContext } from "react";
import Logo from "../../../../assets/images/42.jpg";
import { ChatContext } from "../../../../views/ChatPage/ChatContext";

function ChatCards(props: {
  avatar: string;
  lastMessage: string;
  roomName: string;
}) {
  const { setOpenChat } = useContext(ChatContext);

  const addChatToTab = () => {
    setOpenChat((prev) => {
      if (!prev.includes(props.roomName)) {
        return [...prev, props.roomName];
      }
      return prev;
    });
  };
  return (
    <div onClick={addChatToTab} className="pt-4 pb-2 px-4 flex items-center">
      <img className="rounded-full w-10 h-10" src={Logo} alt=""></img>
      <div className="ml-5 flex flex-col">
        <h1 className="text-gold pb-1">{props.roomName}</h1>
        <p className="text-gold opacity-75">{(props.lastMessage.length > 20) ? props.lastMessage.slice(0, 20-1) + '...' : props.lastMessage}</p>
      </div>
    </div>
  );
}

export default ChatCards;
