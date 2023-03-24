import React, { useContext, useEffect, useState } from "react";
import { BiMessageRoundedAdd } from "react-icons/bi";
import ChatCards from "./ChatCards/ChatCards";
import {
  ChatHistoryBox,
  ChatHistoryTopBar,
  ChatHistoryTopBarTitle,
  ModalCreateJoin,
  ModalBoxCreateRoom,
} from "./ChatHistoryStyle";
import { COLORS } from "../../../colors";
import { nanoid } from "nanoid";
import Popup from "reactjs-popup";
import CreateRoom from "./CreateRoom.tsx/CreateRoom";
import JoinRoom from "./JoinRoom.tsx/JoinRoom";
import { RoomModalOpenContext } from "../../../views/ChatPage/RoomModalOpenContext";
import { useAtom } from "jotai";
import { conversationAtom } from "../../../services/store";
import { useGlobal } from "../../../services/Global/GlobalProvider";

function ChatHistory() {
  const { open, setOpen } = useContext(RoomModalOpenContext);
  const [chatHistory, setChatHistory] = useAtom(conversationAtom);
  const {auth} = useGlobal();

  return (
    <>
      <ChatHistoryTopBar>
        <ChatHistoryTopBarTitle>Conversation</ChatHistoryTopBarTitle>
        <Popup
          trigger={
            <div>
              <BiMessageRoundedAdd
                size={22}
                style={{ color: COLORS.secondary }}
                onClick={() => setOpen(true)}
              />
            </div>
          }
          modal
          open={open}
          nested
        >
          <ModalBoxCreateRoom>
            <ModalCreateJoin>
              <CreateRoom />
              <JoinRoom />
            </ModalCreateJoin>
          </ModalBoxCreateRoom>
        </Popup>
      </ChatHistoryTopBar>
      <ChatHistoryBox>
        {chatHistory.length > 0 &&
          chatHistory.flatMap((val) => {
            const me = val.participants?.find((user) => user.name == auth.username)
            if (!val || (val.lastMessage == "" && me?.role != "OWNER")) return;
            return (
              <ChatCards key={nanoid()} conversation={val}/>
            );
          })}
      </ChatHistoryBox>
    </>
  );
}

export default ChatHistory;
