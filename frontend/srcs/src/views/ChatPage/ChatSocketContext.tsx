import { AxiosResponse } from "axios";
import React, { createContext, useRef, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

async function initializeSocket(axiosPrivate: any) {
  try {
    const res: AxiosResponse = await axiosPrivate.get("auth/me");
    const userId = res.data.id;
    const socket = io("http://localhost:3000/status", {
      query: { userId },
    });
    return socket;
  } catch (err: any) {
    console.log("Error fetching user ID: ", err);
  }
}

export var socket: Socket;

export const ChatSocketContext = createContext<Socket | null>(null);

export function ChatSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const axiosPrivate = useAxiosPrivate();
  const isInit = useRef(false);

  useEffect(() => {
    async function initSocket() {
      const s: any = await initializeSocket(axiosPrivate);
      setSocket(s);
    }
    if (!isInit.current) {
      initSocket();
    }
    isInit.current = true;
  }, []);

  return (
    <ChatSocketContext.Provider value={socket}>
      {children}
    </ChatSocketContext.Provider>
  );
}

export const useChatSocket = () => React.useContext(ChatSocketContext);

export default ChatSocketProvider;
