import { useAtom } from "jotai";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { lobbyAtom, lobbyDefaultValue, userAtom } from "../../services/store";
import { TLobbyMember } from "../../services/type";
import { updateArray } from "../../services/utils/updateArray";
import { useNavigate } from "react-router";

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
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    async function initSocket() {
      const s: any = await initializeSocket(axiosPrivate, user?.accessToken);
      setSocket(s);
    }
    initSocket();
  }, []);

  return (
    <LobbySocketContext.Provider value={socket}>
      {children}
    </LobbySocketContext.Provider>
  );
}
