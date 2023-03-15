import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { ReactNode, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
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
      if (!res.data[0]) return;
      setChat(res.data);
    });
  }, []);

  useEffect(() => {
    socket?.on("on-chat-update", (newChat) => {
      setChat((prev) => updateChatHistory(prev, newChat));
    });

    return () => {
      socket?.off("on-chat-update");
    };
  }, [socket]);

  return <>{children}</>;
}

export default ChatProvider;
