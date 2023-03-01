import React, { createContext } from "react";
import { io, Socket } from "socket.io-client";
import useId from "../../hooks/useId";

function initializeSocket(id: Promise<string>) {
  const userId = id;
  const socket = io("http://localhost:3000/status-update", {
    query: { userId },
  });
  return socket;
}

export const ChatSocketContext = createContext<Socket | null>(null);

export function ChatSocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const id = useId();

  React.useEffect(() => {
    async function initSocket() {
      const s: any = initializeSocket(id);
      setSocket(s);
    }
    initSocket();
  }, []);

  return (
    <ChatSocketContext.Provider value={socket}>
      {children}
    </ChatSocketContext.Provider>
  );
}
