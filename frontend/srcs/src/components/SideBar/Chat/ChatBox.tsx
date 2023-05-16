import { useAtom } from "jotai";
import React, { useContext } from "react";
import Chat from "./Chat";
import { conversationAtom } from "../../../services/store";
import { ChatContainer } from "./ChatStyle";
import { mediaSize } from "../../../mediaSize";
import Popup from "reactjs-popup";
import MediaQuery from "react-responsive";
import { PopUpBox } from "../FriendsList/FriendsCards/FriendsCardsStyle";

function ChatBox() {
  const [chat, setChat] = useAtom(conversationAtom);

  function selectActiveChat() {
    console.log(chat);
    if (chat.length == 0 || chat == undefined) return <></>;
    const index = chat.findIndex((elem) => elem.isActive == true);
    if (index > -1) {
      return (
        <>
          <MediaQuery maxWidth={mediaSize.laptop}>
            <Popup open={index > -1} modal>
              <PopUpBox>
                <Chat chat={chat[index]} />
              </PopUpBox>
            </Popup>
          </MediaQuery>
          <MediaQuery minWidth={mediaSize.laptop + 1}>
            <ChatContainer>
              <Chat chat={chat[index]} />
            </ChatContainer>
          </MediaQuery>
        </>
      );
    }
    return <></>;
  }

  return selectActiveChat();
}

export default ChatBox;
