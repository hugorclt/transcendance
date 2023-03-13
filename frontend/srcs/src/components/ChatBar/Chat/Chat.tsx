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
} from "./ChatStyle";
import { TMessage } from "./ChatType";
import { BsThreeDotsVertical } from "react-icons/bs";
import { COLORS } from "../../../colors";
import { logo42 } from "../../../assets/images/42.jpg";
import { AiOutlineClose } from "react-icons/ai";
import { nanoid } from "nanoid";
import { ChatContext } from "../../../views/ChatPage/ChatContext";

function Chat(props: { name: string }) {
  const [message, setMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<TMessage[]>([]);
  const { openChat, setOpenChat } = useContext(ChatContext);
  const { auth } = useContext(GlobalContext);
  const socket = useContext(SocketContext);
  const axiosPrivate = useAxiosPrivate();
  const messageBoxRef = useRef<null | HTMLFormElement>(null);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    socket?.emit("new-message", { message: message, roomName: props.name });
    setMessage("");
  };

  useEffect(() => {
    socket?.on("on-new-message", (newMessage: TMessage) => {
      if (newMessage.roomName === props.name) {
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
      .post("/rooms/conv/history", { roomName: props.name })
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
  }, [props.name]);

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
    <ChatTabContainer>
      <ChatTop>
        <ChatMiddle>
          <ChatIcon src="" />
          <ChatTitle>{props.name.toLocaleUpperCase()}</ChatTitle>
          <BsThreeDotsVertical style={{ color: COLORS.background }} size={22} />
        </ChatMiddle>
        <AiOutlineClose
          onClick={() => {
            setOpenChat("");
          }}
          style={{ color: COLORS.background }}
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
  );
}

export default Chat;
