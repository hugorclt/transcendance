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
    axiosPrivate.get("/rooms/history").then((res) => {
      if (!res.data[0]) return;
      console.log(res.data);
      setChat(res.data);
    });
  }, []);

  /* ------------------------------ socket render ----------------------------- */
  useEffect(() => {
    socket?.on("on-chat-update", (newChat) => {
      setChat((prev) => updateArray(prev, newChat));

      //TODO:Set orange pastille on new chat not read
      setChat((prev) =>
        prev.map((chat) => {
          if (chat.isActive == true) chat.isRead = true;
          return chat;
        })
      );
    });

    socket?.on("on-chat-delete", (chatToDel) => {
      setChat((prev) => prev.filter((chat) => chat.id != chatToDel.roomId));
    });

    return () => {
      socket?.off("on-chat-update");
      socket?.off("on-chat-delete");
    };
  }, [socket]);

  return <>{children}</>;
}

export default ChatProvider;
