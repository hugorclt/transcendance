import { useAtom } from "jotai";
import React, { ReactNode, useContext, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { SocketContext } from "../../services/Auth/SocketContext";
import { updateChatHistory } from "../../services/Chat/updateChatHistory";
import { conversationAtom } from "../../services/store";

function ChatProvider({ children }: { children: ReactNode }) {
  const [chat, setChat] = useAtom(conversationAtom);
  const axiosPrivate = useAxiosPrivate();
  const socket = useContext(SocketContext);

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
        console.log("yep:", newChat);
        setChat((prev) => {
          const index = prev.findIndex((item) => item.id === newChat.id);
          console.log(index);
          if (index === -1) {
            return prev;
          }
          return [...prev.slice(0, index), ...prev.slice(index + 1)];
        });
      } else {
        setChat((prev) => updateChatHistory(prev, newChat));
      }
    });

    return () => {
      socket?.off("on-chat-update");
    };
  }, [socket]);

  return <>{children}</>;
}

export default ChatProvider;
