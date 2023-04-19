import { useAtom } from "jotai";
import React, { ReactNode, useContext, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { SocketContext } from "../../services/Auth/SocketContext";
import { updateArray } from "../../services/utils/updateArray";
import { conversationAtom } from "../../services/store";

function ChatProvider({ children }: { children: ReactNode }) {
  const [chat, setChat] = useAtom(conversationAtom);
  const axiosPrivate = useAxiosPrivate();
  const socket = useContext(SocketContext);

  /* ------------------------------ first render ------------------------------ */
  useEffect(() => {
    axiosPrivate.get("/invitations").then((res) => {})
  }, []);

  /* ------------------------------ socket render ----------------------------- */
  useEffect(() => {
    socket?.on("on-chat-update", (newChat) => {
    });

    socket?.on("on-chat-delete", (chatToDel) => {
    });

    return () => {
      socket?.off("on-chat-update");
      socket?.off("on-chat-delete");
    };
  }, [socket]);

  return <>{children}</>;
}

export default ChatProvider;
