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
import { COLORS } from "../../../colors";
import { AiOutlineClose } from "react-icons/ai";
import { nanoid } from "nanoid";
import LeftSideChat from "./LeftSideChat/LeftSideChat";
import { ChatManagerOpen } from "../../../views/ChatPage/ChatManagerOpen";
import { FaUserFriends } from "react-icons/fa";
import { useAtom } from "jotai";
import { conversationAtom, userAtom } from "../../../services/store";
import { displayName } from "../../../services/Chat/displayName";
import Popup from "reactjs-popup";
import {IoIosSettings} from 'react-icons/io'
import { ModalBox } from "../../Lobby/TeamBuilder/InviteFriendsButton/InviteFriendsButtonStyle";
import ChatManager from "./ChatManager/ChatManager";

function Chat({ chat }: TChatProps) {
  const [message, setMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<TMessage[]>([]);
  const { openManager, setOpenManager } = useContext(ChatManagerOpen);
  const { auth } = useContext(GlobalContext);
  const socket = useContext(SocketContext);
  const axiosPrivate = useAxiosPrivate();
  const messageBoxRef = useRef<null | HTMLFormElement>(null);
  const [user, setUser] = useAtom(userAtom);
  const [chatHistory, setChat] = useAtom(conversationAtom);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (message == "" || message.length > 256) return;
    axiosPrivate
      .post("/rooms/message", { message: message, roomId: chat.id })
      .then((res: AxiosResponse) => {
        if (res.data.isMuted == false)
          setMessageList((prev) => [...prev, res.data]);
      })
      .catch((err: AxiosError) => {
        console.log("error while sending message");
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
      .post("/rooms/conv/history", { roomName: chat.name })
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

  const renderMessage = (msg: TMessage) => {
    const sender = chatHistory
      .find((chat) => chat.id == chat.id)
      ?.participants.find((user) => user.id == msg.senderId);
    const isMe = sender?.name === auth.username;
    const senderName = isMe ? (
      <div className="sender">You</div>
    ) : (
      <div className="sender">{sender?.name}</div>
    );

    return (
      <MessageLine
        key={nanoid()}
        style={{
          justifyContent: isMe ? "flex-end" : "flex-start",
        }}>
        <div style={{ color: COLORS.primary }}>{senderName}</div>
        <MessageBox
          style={{
            backgroundColor: isMe ? COLORS.primary : COLORS.secondary,
          }}>
          <MessageContent
            style={{
              color: isMe ? COLORS.background : COLORS.primary,
            }}>
            {msg.content}
          </MessageContent>
        </MessageBox>
      </MessageLine>
    );
  };

  return (
    <ChatBody>
      {openManager && <LeftSideChat chat={chat} />}
      <ChatTabContainer>
        <ChatTop>
          <ChatMiddle>
            <ChatIcon src="" />
            <ChatTitle>{displayName(chat, user)}</ChatTitle>
            {!chat.isDm && (
              <FaUserFriends
                onClick={() => setOpenManager(!openManager)}
                style={{ color: COLORS.secondary }}
                size={22}
              />
            )}
          </ChatMiddle>
          <div style={{display:"flex"}}>
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
              nested>
                <ChatManager />
              </Popup>
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
          {messageList.map((val) => {
            return renderMessage(val);
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
          <p style={{ color: message.length <= 256 ? COLORS.primary : "red" }}>
            {message.length + "/256"}
          </p>
        </ChatForm>
      </ChatTabContainer>
    </ChatBody>
  );
}

export default Chat;
