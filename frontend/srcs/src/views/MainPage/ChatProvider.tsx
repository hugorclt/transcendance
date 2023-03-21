import { useAtom } from "jotai";
import React, { ReactNode, useContext, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { SocketContext } from "../../services/Auth/SocketContext";
import { updateChatHistory } from "../../services/Chat/updateChatHistory";
import { conversationAtom, activeChat, conversationDefaultValue } from "../../services/store";

function ChatProvider({ children }: { children: ReactNode }) {
  const [chat, setChat] = useAtom(conversationAtom);
  const axiosPrivate = useAxiosPrivate();
  const socket = useContext(SocketContext);
  const [openChat, setOpenChat] = useAtom(activeChat);

  useEffect(() => {
    axiosPrivate.get("/rooms/history").then((res) => {
      console.log(res.data);
      if (!res.data[0]) return;
      setChat(res.data);
    });
  }, []);

  useEffect(() => {
    socket?.on("on-chat-update", (newChat) => {
      if (newChat.avatar == "deleted") {
        setChat((prev) => {
          const index = prev.findIndex((item) => item.id === newChat.id);
          if (index === -1) {
            return prev;
          }
          if (openChat.id == prev[index].id)
            setOpenChat(conversationDefaultValue);
          return [...prev.slice(0, index), ...prev.slice(index + 1)];
        });
      } else {
        setChat((prev) => updateChatHistory(prev, newChat, openChat));
      }
    });

    return () => {
      socket?.off("on-chat-update");
    };
  }, [socket]);

  return <>{children}</>;
}

export default ChatProvider;
