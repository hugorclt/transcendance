import React, { useContext, useState } from "react";
import { ChatContext } from "../../../views/ChatPage/ChatContext";
import ChatTab from "./ChatTab";
import { nanoid } from "nanoid";

function Chat() {
  const { openChat, setOpenChat } = useContext(ChatContext);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {openChat != "" && (
        <div
          style={{ right: "18rem" }}
          className="absolute bottom-0 right-0 w-72 h-80 bg-dark-blue opacity-80">
          <ChatTab name={openChat} />
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpenChat("");
            }}
          />
        </div>
      )}
    </>
  );
}

export default Chat;
