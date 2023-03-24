import React, { createContext, useState, ReactNode, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useGlobal } from "../../services/Global/GlobalProvider";

async function initializeSocket(axiosPrivate: any, token: string) {
  try {
    const socket = io("http://localhost:3000/lobbies", {
      auth: {
        jwt: token,
      },
    });
    return socket;
  } catch (err: any) {
    console.log("Error Connecting socket: ", err);
  }
}

export const LobbySocketContext = createContext<Socket | null>(null);

export function LobbySocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useGlobal();

  useEffect(() => {
    async function initSocket() {
      console.log("init socket lobby");
      const s: any = await initializeSocket(axiosPrivate, auth?.accessToken);
      setSocket(s);
    }
    initSocket();
  }, []);

  useEffect(() => {
    socket?.on("user-joined-lobby", (user) => {
      console.log("user joined lobby: ", user);
    });
    socket?.on("user-left-lobby", (user) => {
      console.log("user left lobby: ", user);
    });
    return () => {
      socket?.off("user-joined-lobby");
      socket?.off("user-left-lobby");
    };
  }, [socket]);

  return (
    <LobbySocketContext.Provider value={socket}>
      {children}
    </LobbySocketContext.Provider>
  );
}
