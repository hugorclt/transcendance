import { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { UnbanCardsContainer } from "./UnbanCardsStyle";
import { TUnbanCardsProps } from "./TUnbanCards";
import { AiOutlineMinus } from "react-icons/ai";
import { COLORS } from "../../../../../colors";
import { useAtom } from "jotai";
import { conversationAtom } from "../../../../../services/store";

function UnbanCards(props: TUnbanCardsProps) {
  const axiosPrivate = useAxiosPrivate();
  const [chat, setChat] = useAtom(conversationAtom);

  const handleUnban = () => {
    axiosPrivate
      .post("/rooms/unban", { roomId: props.roomId, bannedName: props.name })
      .then((res: AxiosResponse) => {
        setChat((prev) =>
          prev.map((chat) => {
            if (chat.id == props.roomId) {
              chat.participants.filter(
                (participant) => participant.name != props.name
              );
              return chat;
            } else return chat;
          })
        );
      })
      .catch((err: AxiosError) => {
        props.setErrMsg("Error while unbaning player, retry");
      });
  };
  return (
    <UnbanCardsContainer>
      <h5>{props.name}</h5>
      <AiOutlineMinus
        color={COLORS.secondary}
        size={22}
        onClick={handleUnban}
        cursor={"pointer"}
      />
    </UnbanCardsContainer>
  );
}

export default UnbanCards;
