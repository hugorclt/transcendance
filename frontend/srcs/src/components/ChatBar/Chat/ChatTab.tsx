import { AxiosError, AxiosResponse } from "axios";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { GlobalContext } from "../../../services/Global/GlobalProvider";
import { ChatSocketContext } from "../../../views/ChatPage/ChatSocketContext";
import { TMessage } from "./ChatType";

function ChatTab(props: { name: string }) {
  const [message, setMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<TMessage[]>([]);
  const {auth} = useContext(GlobalContext)
  const socket = useContext(ChatSocketContext);
  const axiosPrivate = useAxiosPrivate();

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    socket?.emit("new-message", {message: message, roomName: props.name})
    setMessage(""); 
  };

  useEffect(() => {
    socket?.on("on-new-message", (newMessage: TMessage) => {
      if (newMessage.roomName === props.name)
        setMessageList((prev) => {return [...prev, newMessage]});
      return () => {
        socket?.off("on-new-message");
      };
    });
  }, [socket]);

  const renderMessage = (msg: any, index: any) => {
    const isMe = msg.sender === username;
    const sender = isMe ? "" : <div className="sender">{msg.sender}</div>;
    return (
      <div key={index} className={`scrollbar-hide overflow-y-scroll ${isMe ? "float-right" : "float-left"}`}>
        {/* <img
          className="avatar"
          src={`https://picsum.photos/id/${index + 10}/50/50`}
          alt="Avatar"
        /> */}
        <div className="scrollbar-hide overflow-y-scroll">
          <div className="text-gold scrollbar-hide overflow-y-scroll">{msg.message}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-52 overflow-y-scroll scrollbar-hide">
      {messageList.map((val, index) => {
        return renderMessage(val, index);
      })}
      <form
        className="mx-2 absolute inset-x-0 bottom-0 scrollbar-hide"
        onSubmit={sendMessage}
        autoComplete="off">
        <input
          value={message}
          className="relative inset-x-0 bottom-0 w-full my-2 scrollbar-hide"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          type="text"
        />
      </form>
    </div>
  );
}

export default ChatTab;
