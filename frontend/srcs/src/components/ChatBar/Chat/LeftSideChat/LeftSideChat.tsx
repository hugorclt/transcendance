import { AxiosError, AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import LeftSideChatCards from "./LeftSideChatCards/LeftSideChatCards";
import { ChatManagerBox, ChatManagerTitle } from "./LeftSideChatStyle";
import { TRoomUser } from "./LeftSideChatType";
import { nanoid } from "nanoid";
import { useAtom } from "jotai";
import { GlobalContext } from "../../../../services/Global/GlobalProvider";
import { TConversation, TParticipant } from "../../../../services/type";
import { TChatProps } from "../ChatType";

function LeftSideChat({ chat }: TChatProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const { auth } = useContext(GlobalContext);

  useEffect(() => {
    const user = chat.participants.find(
      (participant: TParticipant) => participant.name == auth.username
    );
    if (user?.role == "ADMIN" || user?.role == "OWNER") setIsAdmin(true);
  }, []);

  return (
    <ChatManagerBox>
      <ChatManagerTitle>PARTICIPANTS</ChatManagerTitle>
      {chat?.participants.map((user: TParticipant) => {
        return (
          <LeftSideChatCards
            key={nanoid()}
            roomId={chat.id}
            userId={user.id}
            name={user.name}
            status={user.status}
            role={user.role}
            isAdmin={isAdmin}
            isMute={user.isMute}
          />
        );
      })}
    </ChatManagerBox>
  );
}

export default LeftSideChat;
