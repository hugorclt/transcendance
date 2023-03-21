import { AxiosError, AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import LeftSideChatCards from "./LeftSideChatCards/LeftSideChatCards";
import { ChatManagerBox, ChatManagerTitle } from "./LeftSideChatStyle";
import { TRoomUser } from "./LeftSideChatType";
import { nanoid } from "nanoid";
import { activeChat } from "../../../../services/store";
import { useAtom } from "jotai";
import { GlobalContext } from "../../../../services/Global/GlobalProvider";

function LeftSideChat(props: { name: string }) {
  const [chat, setChat] = useAtom(activeChat);
  const [isAdmin, setIsAdmin] = useState(false);
  const { auth } = useContext(GlobalContext);

  useEffect(() => {
    const user = chat.participants.find((participant) => participant.name == auth.username);
    if (user?.role == "ADMIN" || user?.role == "OWNER")
      setIsAdmin(true);
  }, [])


  return (
    <ChatManagerBox>
      <ChatManagerTitle>PARTICIPANTS</ChatManagerTitle>
      {chat?.participants.map((user) => {
        return (
          <LeftSideChatCards
            key={nanoid()}
            name={user.name}
            status={user.status}
            role={user.role}
            isAdmin={isAdmin}
          />
        );
      })}
    </ChatManagerBox>
  );
}

export default LeftSideChat;
