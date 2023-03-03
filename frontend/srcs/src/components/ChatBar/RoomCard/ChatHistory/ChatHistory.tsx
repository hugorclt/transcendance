import React, { useContext } from "react";
import { IconContext } from "react-icons/lib";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { CreateRoomContext } from "../../../../views/ChatPage/CreateRoomContext";

function ChatHistory() {
  const { isActive, setIsActive } = useContext(CreateRoomContext);

  return (
    <figure className="history-side">
      <div className="flex justify-between">
        <h2 className="text-gold">Conversations</h2>
        <IconContext.Provider value={{ color: "#E8C47C" }}>
          <BiMessageRoundedAdd
            size={20}
            onClick={() => setIsActive(!isActive)}
          />
        </IconContext.Provider>
      </div>
    </figure>
  );
}

export default ChatHistory;
