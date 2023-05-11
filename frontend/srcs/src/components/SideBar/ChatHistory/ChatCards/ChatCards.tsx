import { useAtom } from "jotai";
import {
  ChatCardsBox,
  ChatCardsEnd,
  ChatCardsLastMessage,
  ChatCardsMiddle,
  ChatCardsName,
  ChatCardsRoundedAvatar,
  RoundNewChat,
} from "./ChatCardsStyle";
import { conversationAtom } from "../../../../services/store";
import { ChatCardsProps } from "./ChatCardsType";
import { userAtom } from "../../../../services/store";
import { displayName } from "../../../../services/Chat/displayName";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
// import { COLORS } from "../../../../colors";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import { COLORS } from "../../../../colors";
import { getImageBase64 } from "../../../../services/utils/getImageBase64";
import { TConversation, TUser } from "../../../../services/type";

export const getImageFromConversation = (conversation : TConversation, user: TUser) => {
  if (conversation.isDm == true) {
    if (conversation.participants[0].id == user.id) {
      return (getImageBase64(conversation.participants[1].avatar))
    } else {
      return (getImageBase64(conversation.participants[0].avatar))
    }
  } else {
    return getImageBase64(conversation.avatar)
  }
}

function ChatCards({ conversation }: ChatCardsProps) {
  const [chat, setChat] = useAtom(conversationAtom);
  const [user, setUser] = useAtom(userAtom);
  const [cross, setCross] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const addChatToTab = () => {
    setChat((prev) =>
      prev.map((elem) => {
        if (elem.isActive && elem.id == conversation.id) {
          elem.isActive = false;
          return elem;
        }
        if (elem.isActive)
          elem.isActive = false;
        if (elem.id == conversation.id) {
          elem.isActive = true;
          elem.isRead = true;
        }
        return elem;
      })
    );
  };

  const openCross = () => setCross(true);
  const closeCross = () => setCross(false);

  const leaveConversation = () => {
    axiosPrivate
      .get(`/rooms/leave/${conversation.id}`)
      .then((res: AxiosResponse) => {
        setChat((prev) =>
          prev.map((chat) => {
            if (chat.isActive == true) chat.isActive = false;
            return chat;
          })
        );
        setChat((prev) => prev.filter((conv) => conv.id != conversation.id));
      })
      .catch((err: AxiosError) =>
        console.log("Error while deleting conversation", err)
      );
  };

  return (
    <ChatCardsBox onMouseEnter={openCross} onMouseLeave={closeCross}>
      <div onClick={addChatToTab} style={{ display: "flex", width: "90%" }}>
        <ChatCardsRoundedAvatar src={getImageFromConversation(conversation, user)} />
        <ChatCardsMiddle>
          <h5>{displayName(conversation, user)}</h5>
          <p>
            {conversation.lastMessage && conversation.lastMessage.length >= 15
              ? conversation.lastMessage.substring(0, 15) + "..."
              : conversation.lastMessage}
          </p>
        </ChatCardsMiddle>
      </div>
      <ChatCardsEnd>
        {cross && (
          <AiOutlineClose
            onClick={leaveConversation}
            style={{ color: COLORS.secondary }}
            size={22}
          />
        )}
      </ChatCardsEnd>
    </ChatCardsBox>
  );
}

export default ChatCards;
