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
  CreateRoomBox,
  CreateRoomCheckBox,
  CreateRoomLabel,
  CreateRoomForm,
  CreateRoomTitle,
  CreateRoomMiddle,
} from "./ChatHistoryStyle";
import { COLORS } from "../../../colors";
import logo42 from "../../../assets/images/42.jpg";
import { nanoid } from "nanoid";
import Popup from "reactjs-popup";
import {
  ModalBox,
  StyledButton,
  StyledInput,
} from "../FriendsList/FriendsTopBar/FriendsTopBarStyle";

function ChatHistory() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isPrivate, setPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const { chatHistory, setChatHistory } = useContext(ChatHistoryContext);
  const socket = useContext(SocketContext);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get("/rooms/history").then((res) => {
      console.log(res.data);
      setChatHistory(res.data);
    });
  }, []);

  const handleCheck = () => {
    setPrivate(!isPrivate);
    if (!isPrivate) setPassword("");
  };

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
            <CreateRoomBox>
              <CreateRoomTitle>CREATE ROOM</CreateRoomTitle>
              <CreateRoomForm autoComplete="off">
                <CreateRoomLabel htmlFor="name">Room name</CreateRoomLabel>
                <StyledInput
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  autoComplete="off"></StyledInput>
                <CreateRoomLabel htmlFor="password">Password</CreateRoomLabel>
                <CreateRoomMiddle>
                  <StyledInput
                    name="password"
                    value={password}
                    disabled={isPrivate}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    autoComplete="off"></StyledInput>
                  <CreateRoomLabel htmlFor="checkbox">
                    Is Public?
                  </CreateRoomLabel>
                  <CreateRoomCheckBox
                    name="checkbox"
                    checked={isPrivate}
                    onChange={handleCheck}
                    type="checkbox"></CreateRoomCheckBox>
                </CreateRoomMiddle>
                <StyledButton type="submit" value="Create Room" />
              </CreateRoomForm>
            </CreateRoomBox>
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
