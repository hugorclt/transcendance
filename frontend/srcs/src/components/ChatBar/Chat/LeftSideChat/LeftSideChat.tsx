import { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import LeftSideChatCards from "./LeftSideChatCards/LeftSideChatCards";
import { ChatManagerBox, ChatManagerTitle } from "./LeftSideChatStyle";
import { TRoomUser } from "./LeftSideChatType";
import { nanoid } from "nanoid";

function LeftSideChat(props: { name: string }) {
  const [userList, setUserList] = useState<TRoomUser[]>([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .post("/rooms/participants", { roomName: props.name })
      .then((res: AxiosResponse) => {
        setUserList(res.data);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }, []);

  return (
    <ChatManagerBox>
      <ChatManagerTitle>PARTICIPANTS</ChatManagerTitle>
      {userList?.map((user) => {
        return (
          <LeftSideChatCards
            key={nanoid()}
            name={user.name}
            status={user.status}
            role={user.role}
          />
        );
      })}
    </ChatManagerBox>
  );
}

export default LeftSideChat;
