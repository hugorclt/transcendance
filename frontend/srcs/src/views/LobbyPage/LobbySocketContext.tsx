import React, {
  createContext,
  useRef,
  useState,
  ReactNode,
  useEffect,
} from "react";
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
  const connected = useRef(false);
  const { auth } = useGlobal();

  useEffect(() => {
    async function initSocket() {
      if (!connected.current) {
        console.log("init socket lobby");
        console.log(auth);
        const s: any = await initializeSocket(axiosPrivate, auth?.accessToken);
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
