import React, { useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons/lib";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { CreateRoomContext } from "../../../views/ChatPage/CreateRoomContext";
import { ChatHistoryContext } from "../../../views/ChatPage/ChatHistoryContext";
import ChatCards from "./ChatCards/ChatCards";
import { SocketContext } from "../../../services/Auth/SocketContext";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {
  ChatHistoryBox,
  ChatHistoryTopBar,
  ChatHistoryTopBarTitle,
  ModalCreateJoin,
} from "./ChatHistoryStyle";
import { COLORS } from "../../../colors";
import logo42 from "../../../assets/images/42.jpg";
import { nanoid } from "nanoid";
import Popup from "reactjs-popup";
import {
  ModalBox,
} from "../FriendsList/FriendsTopBar/FriendsTopBarStyle";
import CreateRoom from "./CreateRoom.tsx/CreateRoom";
import JoinRoom from "./JoinRoom.tsx/JoinRoom";
import { RoomModalOpenContext } from "../../../views/ChatPage/RoomModalOpenContext";

function ChatHistory() {
  const { open, setOpen } = useContext(RoomModalOpenContext);
  const { chatHistory, setChatHistory } = useContext(ChatHistoryContext);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get("/rooms/history").then((res) => {
      console.log(res.data);
      setChatHistory(res.data);
    });
  }, []);

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
          nested>
          <ModalBox>
            <ModalCreateJoin>
              <CreateRoom />
              <JoinRoom />
            </ModalCreateJoin>
          </ModalBox>
        </Popup>
      </ChatHistoryTopBar>
      <ChatHistoryBox>
        {chatHistory.map((val) => {
          return (
            <ChatCards
              key={nanoid()}
              avatar={val.avatar}
              roomName={val.name}
              lastMessage={val.lastMessage}
            />
          );
        })}
      </ChatHistoryBox>
    </>
  );
}

export default ChatHistory;
