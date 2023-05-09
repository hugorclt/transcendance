import { AxiosError, AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import LeftSideChatCards from "./LeftSideChatCards/LeftSideChatCards";
import { ChatManagerBox, ChatManagerTitle } from "./LeftSideChatStyle";
import { TRoomUser } from "./LeftSideChatType";
import { nanoid } from "nanoid";
import { useAtom } from "jotai";
import { TConversation, TParticipant } from "../../../../services/type";
import { TChatProps } from "../ChatType";
import { userAtom } from "../../../../services/store";

function LeftSideChat({ chat }: TChatProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useAtom(userAtom)

  useEffect(() => {
    const userInRoom = chat.participants.find(
      (participant: TParticipant) => participant.name == user.username
    );
    if (userInRoom?.role == "ADMIN" || userInRoom?.role == "OWNER") setIsAdmin(true);
  }, []);

  return (
    <ChatManagerBox>
      <h4>PARTICIPANTS</h4>
      {chat?.participants.map((userRoom: TParticipant) => {
        return (
          <LeftSideChatCards
            key={nanoid()}
            roomId={chat.id}
            userId={userRoom.id}
            name={userRoom.name}
            status={userRoom.status}
            role={userRoom.role}
            isAdmin={isAdmin}
            mute={userRoom.mute}
          />
        );
      })}
    </ChatManagerBox>
  );
}

export default LeftSideChat;
