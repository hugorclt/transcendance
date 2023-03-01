import { AxiosError, AxiosResponse } from 'axios';
import React, { createContext } from 'react';
import { io, Socket } from 'socket.io-client';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

async function initializeSocket(axiosPrivate: any) {
  try {
    const res: AxiosResponse = await axiosPrivate.get("auth/me");
    const userId = res.data.id;
    const socket = io('http://localhost:3000/status-update', {
      query: { userId },
    });
    return (socket);
  } catch (err: any) {
    console.log("Error fetching user ID: ", err);
  }
}

export const ChatSocketContext = createContext<Socket | null>(null);

export function ChatSocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const axiosPrivate = useAxiosPrivate();

  React.useEffect(() => {
    async function initSocket() {
      const s : any = await initializeSocket(axiosPrivate);
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