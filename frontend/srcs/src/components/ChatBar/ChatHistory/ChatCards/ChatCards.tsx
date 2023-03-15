import { useAtom } from "jotai";
import {
  ChatCardsBox,
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

function ChatCards({ conversation }: ChatCardsProps) {
  const [openChat, setOpenChat] = useAtom(activeChat);
  const [user, setUser] = useAtom(userAtom);

  const addChatToTab = () => {
    if (openChat.name == conversation.name)
      setOpenChat(conversationDefaultValue);
    else {
      setOpenChat(conversation);
    }
  };

  return (
    <ChatCardsBox onClick={addChatToTab}>
      <ChatCardsRoundedAvatar src={conversation.avatar} />
      <ChatCardsMiddle>
        <ChatCardsName>
          {displayName(conversation, user)}
        </ChatCardsName>
        <ChatCardsLastMessage>
          {conversation.lastMessage.length >= 20
            ? conversation.lastMessage.substring(0, 20) + "..."
            : conversation.lastMessage}
        </ChatCardsLastMessage>
      </ChatCardsMiddle>
    </ChatCardsBox>
  );
}

export default ChatCards;
