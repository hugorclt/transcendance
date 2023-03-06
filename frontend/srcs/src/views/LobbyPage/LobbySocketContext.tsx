import { AxiosError, AxiosResponse } from "axios";
import React, { createContext, useRef, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

async function initializeSocket(axiosPrivate: any) {
  try {
    const res: AxiosResponse = await axiosPrivate.get("auth/me");
    const userId = res.data.id;
    const socket = io("http://localhost:3000/lobbies", {
      query: { userId },
    });
    return socket;
  } catch (err: any) {
    console.log("Error fetching user ID: ", err);
  }
}

export const LobbySocketContext = createContext<Socket | null>(null);

export function LobbySocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const axiosPrivate = useAxiosPrivate();
  const connected = useRef(false);

  React.useEffect(() => {
    async function initSocket() {
      console.log("init socket lobby");
      if (!connected.current) {
        const s: any = await initializeSocket(axiosPrivate);
        setSocket(s);
      }
      connected.current = true;
    }
    initSocket();
  }, []);

  return (
    <LobbySocketContext.Provider value={socket}>
      {children}
    </LobbySocketContext.Provider>
  );
}
