import React, { useContext, useState } from "react";
import { ChatContext } from "../../../views/ChatPage/ChatContext";
import ChatTab from "./ChatTab";
import { nanoid } from "nanoid";

function Chat() {
  const { openChat, setOpenChat } = useContext(ChatContext);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {openChat.length != 0 && (
        <div
          style={{ right: "18rem" }}
          className="absolute bottom-0 right-0 w-72 h-80 bg-dark-blue opacity-80">
          {openChat.map((tab, idx) => {
            return (
              <button
                key={idx}
                className={`py-2 border-b-4 text-gold px-2 transition-colors duration-300 ${
                  idx === activeTab
                    ? "border-gold"
                    : "border-transparent hover:border-sky-blue"
                }`}
                // Change the active tab on click.
                onClick={() => setActiveTab(idx)}>
                {tab}
                <div>
                  <button
                    onClick={() => {
                      openChat.splice(idx, 1);
                      idx++;
                    }}
                    className="text-gold">
                    X
                  </button>
                </div>
              </button>
            );
          })}
          <ChatTab name={openChat[activeTab]} />
        </div>
      )}
    </>
  );
}

export default Chat;
