import { useAtom } from "jotai";
import {
  ChatCardsBox,
  ChatCardsEnd,
  ChatCardsLastMessage,
  ChatCardsMiddle,
  ChatCardsName,
  ChatCardsRoundedAvatar,
} from "./ChatCardsStyle";
import {
  activeChat,
  conversationDefaultValue,
} from "../../../../services/store";
import { ChatCardsProps } from "./ChatCardsType";
import { userAtom } from "../../../../services/store";
import { displayName } from "../../../../services/Chat/displayName";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { COLORS } from "../../../../colors";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";

function ChatCards({ conversation }: ChatCardsProps) {
  const [openChat, setOpenChat] = useAtom(activeChat);
  const [user, setUser] = useAtom(userAtom);
  const [cross, setCross] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const addChatToTab = () => {
    if (openChat.name == conversation.name)
      setOpenChat(conversationDefaultValue);
    else {
      setOpenChat(conversation);
    }
  };

  const openCross = () => setCross(true);
  const closeCross = () => setCross(false);

  const leaveConversation = () => {
    axiosPrivate
      .post("/rooms/leave", { userId: user.id, roomId: conversation.id })
      .then((res: AxiosResponse) => console.log("conv deleted"))
      .catch((err: AxiosError) =>
        console.log("Error while deleting conversation")
      );
  };

  return (
    <ChatCardsBox onMouseEnter={openCross} onMouseLeave={closeCross}>
      <div onClick={addChatToTab} style={{display: "flex"}}>
        <ChatCardsRoundedAvatar src={conversation.avatar} />
        <ChatCardsMiddle>
          <ChatCardsName>{displayName(conversation, user)}</ChatCardsName>
          <ChatCardsLastMessage>
            {conversation.lastMessage.length >= 20
              ? conversation.lastMessage.substring(0, 20) + "..."
              : conversation.lastMessage}
          </ChatCardsLastMessage>
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
