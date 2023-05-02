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
import { useAtom } from "jotai";
import { conversationAtom, userAtom } from "../../../services/store";
import { RoomModalOpenContext } from "../../../views/SideBarPage/RoomModalOpenContext";
import SliderMenu from "../../common/SliderMenu/SliderMenu";
import { RxCross2 } from "react-icons/rx";

function ChatHistory() {
  const [open, setOpen] = useState(false);
  const [isCreate, setIsCreate] = useState("CREATE");
  const [chatHistory, setChatHistory] = useAtom(conversationAtom);
  const [user] = useAtom(userAtom);

  return (
    <>
      <ChatHistoryTopBar>
        <h4>Conversation</h4>
        <BiMessageRoundedAdd
          size={22}
          style={{ color: COLORS.secondary, cursor: "pointer" }}
          onClick={() => setOpen(true)}
        />
        <Popup modal open={open} onClose={() => setOpen(false)}>
          <ModalBoxCreateRoom>
            <ModalCreateJoin>
              <RxCross2
                onClick={() => {
                  setOpen(false);
                }}
                color={COLORS.secondary}
                size={18}
                style={{ cursor: "pointer" }}
              />
              <SliderMenu
                items={["CREATE", "JOIN"]}
                flex={"space-between"}
                state={isCreate}
                setState={setIsCreate}
              />
              {isCreate == "CREATE" ? <CreateRoom /> : <JoinRoom />}
            </ModalCreateJoin>
          </ModalBoxCreateRoom>
        </Popup>
      </ChatHistoryTopBar>
      <ChatHistoryBox>
        {chatHistory.length > 0 &&
          chatHistory.flatMap((val) => {
            const me = val.participants?.find(
              (participant) => participant.name == user.username
            );
            if (!val || (val.lastMessage == "" && me?.role != "OWNER")) return;
            return <ChatCards key={nanoid()} conversation={val} />;
          })}
      </ChatHistoryBox>
    </>
  );
}

export default ChatHistory;
