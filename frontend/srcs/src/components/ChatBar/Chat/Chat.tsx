import { AxiosError, AxiosResponse } from "axios";
import React, {
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { GlobalContext } from "../../../services/Global/GlobalProvider";
import { SocketContext } from "../../../services/Auth/SocketContext";
import {
  ChatForm,
  ChatInput,
  ChatMessageContainer,
  ChatTabContainer,
  MessageLine,
  MessageContent,
  MessageBox,
  ChatMiddle,
  ChatTop,
  ChatIcon,
  ChatTitle,
  ChatBody,
} from "./ChatStyle";
import { TChatProps, TMessage } from "./ChatType";
import { BsThreeDotsVertical } from "react-icons/bs";
import { COLORS } from "../../../colors";
import { AiOutlineClose } from "react-icons/ai";
import { nanoid } from "nanoid";
import LeftSideChat from "./LeftSideChat/LeftSideChat";
import { ChatManagerOpen } from "../../../views/ChatPage/ChatManagerOpen";
import { FaUserFriends } from "react-icons/fa";
import { useAtom } from "jotai";
import { activeChat, userAtom } from "../../../services/store";
import { conversationDefaultValue } from "../../../services/store";
import { displayName } from "../../../services/Chat/displayName";

function Chat({ chat }: TChatProps) {
  const [message, setMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<TMessage[]>([]);
  const [openChat, setOpenChat] = useAtom(activeChat);
  const { openManager, setOpenManager } = useContext(ChatManagerOpen);
  const { auth } = useContext(GlobalContext);
  const socket = useContext(SocketContext);
  const axiosPrivate = useAxiosPrivate();
  const messageBoxRef = useRef<null | HTMLFormElement>(null);
  const [user, setUser] = useAtom(userAtom);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    socket?.emit("new-message", { message: message, room: chat });
    setMessage("");
  };

  useEffect(() => {
    socket?.on("on-new-message", (newMessage: TMessage) => {
      if (newMessage.roomName === chat.name) {
        setMessageList((prev) => {
          return [...prev, newMessage];
        });
      }

      return () => {
        socket?.off("on-new-message");
      };
    });
  }, [socket]);

  useEffect(() => {
    axiosPrivate
      .post("/rooms/conv/history", { roomName: chat.name })
      .then((res: AxiosResponse) => {
        setMessageList(
          res.data.map((message: any) => ({
            message: message.content,
            sender: message.sender.username,
            roomName: message.room.name,
          }))
        );
      })
      .catch((err: AxiosError) => {
        console.log("error");
      });
    return () => {
      setMessageList([]);
    };
  }, [chat.name]);

  useEffect(() => {
    if (messageBoxRef && messageBoxRef.current) {
      const element = messageBoxRef.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [messageList]);

  const renderMessage = (msg: any, index: any) => {
    const isMe = msg.sender === auth.username;
    const sender = isMe ? (
      <div className="sender">You</div>
    ) : (
      <div className="sender">{msg.sender}</div>
    );

    return (
      <MessageLine
        key={nanoid()}
        style={{
          justifyContent: isMe ? "flex-end" : "flex-start",
        }}>
        <div style={{ color: COLORS.primary }}>{sender}</div>
        <MessageBox
          style={{
            backgroundColor: isMe ? COLORS.primary : COLORS.secondary,
          }}>
          <MessageContent
            style={{
              color: isMe ? COLORS.background : COLORS.primary,
            }}>
            {msg.message}
          </MessageContent>
        </MessageBox>
      </MessageLine>
    );
  };

  return (
    <ChatBody>
      {openManager && <LeftSideChat name={chat.name} />}
      <ChatTabContainer>
        <ChatTop>
          <ChatMiddle>
            <ChatIcon src="" />
            <ChatTitle>{displayName(openChat, user)}</ChatTitle>
            {!chat.isDm && (
              <FaUserFriends
                onClick={() => setOpenManager(!openManager)}
                style={{ color: COLORS.secondary }}
                size={22}
              />
            )}
          </ChatMiddle>
          <AiOutlineClose
            onClick={() => {
              setOpenChat(conversationDefaultValue);
            }}
            style={{ color: COLORS.secondary }}
            size={22}
          />
        </ChatTop>
        <ChatMessageContainer ref={messageBoxRef}>
          {messageList.map((val, index) => {
            return renderMessage(val, index);
          })}
        </ChatMessageContainer>
        <ChatForm onSubmit={sendMessage} autoComplete="off">
          <ChatInput
            placeholder="send a message here..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            type="text"
          />
        </ChatForm>
      </ChatTabContainer>
    </ChatBody>
  );
}

export default Chat;
