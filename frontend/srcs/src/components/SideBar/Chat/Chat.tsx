import { AxiosError, AxiosResponse } from "axios";
import React, {
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
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
import { COLORS } from "../../../colors";
import { AiOutlineClose } from "react-icons/ai";
import { nanoid } from "nanoid";
import LeftSideChat from "./LeftSideChat/LeftSideChat";
import { ChatManagerOpen } from "../../../views/SideBarPage/ChatManagerOpen";
import { FaUserFriends } from "react-icons/fa";
import { useAtom } from "jotai";
import { conversationAtom, userAtom } from "../../../services/store";
import { displayName } from "../../../services/Chat/displayName";
import Popup from "reactjs-popup";
import { IoIosSettings } from "react-icons/io";
import ChatManager from "./ChatManager/ChatManager";
import { getImageBase64 } from "../../../services/utils/getImageBase64";
import MediaQuery from "react-responsive";
import { mediaSize } from "../../../mediaSize";

function Chat({ chat }: TChatProps) {
  const [message, setMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<TMessage[]>([]);
  const { openManager, setOpenManager } = useContext(ChatManagerOpen);
  const socket = useContext(SocketContext);
  const axiosPrivate = useAxiosPrivate();
  const messageBoxRef = useRef<null | HTMLFormElement>(null);
  const [user, setUser] = useAtom(userAtom);
  const [chatHistory, setChat] = useAtom(conversationAtom);
  const [errMsg, setErrMsg] = useState("");

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (message == "" || message.length > 256) return;
    axiosPrivate
      .post("/rooms/message", { content: message, roomId: chat.id })
      .then((res: AxiosResponse) => {
        if (res.data.isMuted == false)
          setMessageList((prev) => [...prev, res.data]);
        setErrMsg("");
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 403) setErrMsg("You are muted");
      });
    setMessage("");
  };

  useEffect(() => {
    socket?.on("on-new-message", (newMessage: TMessage) => {
      if (newMessage.roomId === chat.id) {
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
      .get(`/rooms/history/${chat.id}`)
      .then((res: AxiosResponse) => {
        setMessageList(
          res.data.map((message: TMessage) => ({
            content: message.content,
            senderId: message.senderId,
            roomId: message.roomId,
          }))
        );
      })
      .catch((err: AxiosError) => {
        console.log("error", err);
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

  const renderMessage = (msg: TMessage, idx: number, array: TMessage[]) => {
    const sender = chatHistory
      .find((chat) => chat.id == chat.id)
      ?.participants.find((user) => user.id == msg.senderId);
    const isMe = sender?.name === user.username;
    const senderName = isMe ? (
      <div className="sender">You</div>
    ) : (
      <div className="sender">{sender?.name}</div>
    );

    return (
      <MessageLine
        key={nanoid()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isMe ? "flex-end" : "flex-start",
          boxSizing: "border-box",
        }}
      >
        {idx == 0 || array[idx - 1].senderId != msg.senderId ? (
          <div style={{ color: COLORS.primary }}>{senderName}</div>
        ) : (
          <></>
        )}
        <MessageBox
          style={{
            backgroundColor: isMe ? COLORS.primary : COLORS.secondary,
          }}
        >
          <MessageContent
            style={{
              color: isMe ? COLORS.background : COLORS.primary,
            }}
          >
            {msg.content}
          </MessageContent>
        </MessageBox>
      </MessageLine>
    );
  };

  const isOwner = () => {
    const owner = chat.participants.find(
      (participant) => participant.id == user.id
    );
    if (owner.role == "OWNER") return true;
    return false;
  };

  return (
    <ChatBody>
      <MediaQuery minWidth={mediaSize.laptop + 1}>
        {!chat.isDm && openManager && <LeftSideChat chat={chat} />}
      </MediaQuery>
      <ChatTabContainer>
        <ChatTop>
          <ChatMiddle>
            <ChatIcon src={getImageBase64(chat.avatar)} />
            <ChatTitle>{displayName(chat, user)}</ChatTitle>
            <MediaQuery minWidth={mediaSize.laptop + 1}>
              {!chat.isDm && (
                <FaUserFriends
                  onClick={() => setOpenManager(!openManager)}
                  style={{ color: COLORS.secondary }}
                  size={22}
                />
              )}
            </MediaQuery>
          </ChatMiddle>
          <div style={{ display: "flex" }}>
            {!chat.isDm && isOwner() && (
              <Popup
                trigger={
                  <div>
                    <IoIosSettings
                      size={22}
                      style={{ color: COLORS.secondary }}
                    />
                  </div>
                }
                modal
                nested
              >
                <ChatManager chat={chat} />
              </Popup>
            )}
            <AiOutlineClose
              onClick={() => {
                setChat((prev) =>
                  prev.map((chat) => {
                    if (chat.isActive == true) chat.isActive = false;
                    return chat;
                  })
                );
              }}
              style={{ color: COLORS.secondary }}
              size={22}
            />
          </div>
        </ChatTop>
        <ChatMessageContainer ref={messageBoxRef}>
          {messageList.map((val, idx, array) => {
            return renderMessage(val, idx, array);
          })}
        </ChatMessageContainer>
        <ChatForm onSubmit={sendMessage} autoComplete="off">
          <ChatInput
            autoFocus={true}
            placeholder="send a message here..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            type="text"
          />
        </ChatForm>
        <p style={{ color: message.length <= 256 ? COLORS.primary : "red" }}>
          {message.length + "/256"}
        </p>
        {errMsg.length > 0 ? <p style={{ color: "red" }}>{errMsg}</p> : <></>}
      </ChatTabContainer>
    </ChatBody>
  );
}

export default Chat;
