import { AxiosError, AxiosResponse } from "axios";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ChatSocketContext } from "../../../views/ChatPage/ChatSocketContext";
import { TMessage } from "./ChatType";

function ChatTab(props: { name: string }) {
  const axiosPrivate = useAxiosPrivate();
  const [message, setMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<TMessage[]>([]);
  const [username, setUsername] = useState("");
  const socket = useContext(ChatSocketContext);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    axiosPrivate
      .get("auth/me")
      .then((res: AxiosResponse) => {
        setUsername(res.data.username);
        setMessageList((prev) => [
          ...prev,
          { message: message, sender: username },
        ]);
        socket?.emit("message-sent", {
          message: message,
          userFromId: res.data.id,
          userToName: props.name,
        });
        setMessage("");
      })
      .catch((err: AxiosError) => {
        console.log("error while sending the message");
      });
  };

  useEffect(() => {
    socket?.on("on-message-sent", (newMessage: TMessage) => {
      setMessageList((prev) => [...prev, newMessage]);
      return () => {
        socket?.off("on-message-sent");
      };
    });
  }, [socket]);

  const renderMessage = (msg: any, index: any) => {
    const isMe = msg.sender === username;
    const sender = isMe ? "" : <div className="sender">{msg.sender}</div>;
    console.log("wtf", index);
    return (
      <div key={index} className={`${isMe ? "float-right" : "float-left"}`}>
        {/* <img
          className="avatar"
          src={`https://picsum.photos/id/${index + 10}/50/50`}
          alt="Avatar"
        /> */}
        <div className="">
          <div className="text-gold">{msg.message}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full overflow-scroll">
      {messageList.map((val, index) => {
        return renderMessage(val, index);
      })}
      <form
        className=" mx-2 absolute inset-x-0 bottom-0"
        onSubmit={sendMessage}
        autoComplete="off">
        <input
          value={message}
          className="relative inset-x-0 bottom-0 w-full my-2"
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
