import React, { useContext } from "react";
import { IconContext } from "react-icons/lib";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { CreateRoomContext } from "../../../../views/ChatPage/CreateRoomContext";
import { ChatHistoryContext } from "../../../../views/ChatPage/ChatHistoryContext";
import ChatCards from "./ChatCards/ChatCards";

function ChatHistory() {
  const { isActive, setIsActive } = useContext(CreateRoomContext);
  const { chatHistory, setChatHistory } = useContext(ChatHistoryContext);

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
