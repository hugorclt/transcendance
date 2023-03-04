import React, { useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons/lib";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { CreateRoomContext } from "../../../../views/ChatPage/CreateRoomContext";
import { ChatHistoryContext, TChatHistoryType } from "../../../../views/ChatPage/ChatHistoryContext";
import ChatCards from "./ChatCards/ChatCards";
import { ChatSocketContext } from "../../../../views/ChatPage/ChatSocketContext";

function ChatHistory() {
  const { isActive, setIsActive } = useContext(CreateRoomContext);
  const [ chatHistory, setChatHistory ] = useState<TChatHistoryType[]>([]);
  const socket = useContext(ChatSocketContext);

  useEffect(() => {
    socket?.on("on-new-chat", (data: TChatHistoryType) => {
      console.log(data);
      setChatHistory((prev) => [...prev, data]);
    })
    return () => {
      socket?.off("on-new-chat");
    }
  }, [socket])

  return (
    <figure className="flex flex-col h-full history-side">
      <div className="flex justify-between pt-2">
        <h2 className="text-gold">Conversations</h2>
        <IconContext.Provider value={{ color: "#E8C47C" }}>
          <BiMessageRoundedAdd
            size={20}
            onClick={() => setIsActive(!isActive)}
          />
        </IconContext.Provider>
      </div>
      <div className="overflow-y-scroll scrollbar-hide">
        {chatHistory.map((item, index) => {
          return (
            <ChatCards
              key={index}
              avatar={item.avatar}
              roomName={item.name}
              lastMessage={item.lastMessage}
            />
          );
        })}
      </div>
    </figure>
  );
}

export default ChatHistory;
