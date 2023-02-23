import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../../services/WebSocket/WebsocketContext";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";
import "./Websocket.css"

type MessagePayload = {
  content: string;
  msg: string;
  username: string;
};

export const Websocket = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const socket = useContext(WebsocketContext);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [username, setUsername] = useState("");
  // let username : string;

  useEffect(() => {
    axiosPrivate
      .get("/auth/me")
      .then((response: AxiosResponse) => {
        console.log(response.data);
        setUsername(response.data.username);
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
    socket.on("connect", () => {
      // console.log("Connected!");
    });
    socket.on("onMessage", (newMessage: MessagePayload) => {
      setMessages((prev) => [...prev, newMessage]);
    });
    return () => {
      socket.off("connect");
      socket.off("onMessage");
    };
  }, []);

  const onKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onSubmit();
    }
  };

  const onSubmit = () => {
    socket.emit("newMessage", {
      username: username,
      content: value,
    });
    setValue("");
  };

  const renderMessage = (msg : any, index : any) => {
    const isMe = msg.username === username;
    const sender = isMe ? "" : <div className="sender">{msg.username}</div>;

    return (
      <div key={index} className={`chat-message ${isMe ? "me" : ""}`}>
        <img
          className="avatar"
          src={`https://picsum.photos/id/${index + 10}/50/50`}
          alt="Avatar"
        />
        <div className="message-container">
          {sender}
          <div className="message">{msg.content}</div>
        </div>
      </div>
    );
  };

  const renderChat = () => {
    return (
      <div className="chat-container">
        <div className="chat-header">Chat Component</div>
        <div className="chat-messages">
          {messages.length === 0 ? (
            <div></div>
          ) : (
            <div>{messages.map(renderMessage)}</div>
          )}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      {renderChat()}
    </div>
  );
};
