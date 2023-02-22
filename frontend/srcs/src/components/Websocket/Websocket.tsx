import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../../services/WebSocket/WebsocketContext";
import useAuth from "../../hooks/useAuth";

type MessagePayload = {
  content: string;
  msg: string;
};

export const Websocket = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const socket = useContext(WebsocketContext);
  const {auth} = useAuth()

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected!");
    });
    socket.on("onMessage", (newMessage: MessagePayload) => {
      console.log("onMessage event received!");
      console.log(auth.accessToken);
      console.log(newMessage);
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      console.log("Unregistering events...");
      socket.off("connect"); // if you take of this line connection happens twice
      socket.off("onMessage");
    };
  }, []);

  const onKeyDown = (e : any) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  const onSubmit = () => {
    socket.emit("newMessage", value);
    setValue("");
  };

  return (
    <div>
      <div>
        <h1>Websocket Component</h1>
        <div>
          {messages.length === 0 ? (
            <div></div>
          ) : (
            <div>
              {messages.map((msg) => (
                <div>
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>
          )}
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};



// export type Auth = {
//   username: string;
//   accessToken: string;
// };