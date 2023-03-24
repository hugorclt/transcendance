import React, {
  createContext,
  useRef,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { io, Socket } from "socket.io-client";
import { useGlobal } from "../Global/GlobalProvider";

async function initializeSocket(token: string) {
  try {
    const socket = io("http://localhost:3000/game", {
      auth: {
        jwt: token,
      },
    });
    return socket;
  } catch (err: any) {
    console.log("Error Connecting socket: ", err);
  }
}

export const GameSocket = createContext<Socket | null>(null);

export function GameSocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const connected = useRef(false);
  const { auth } = useGlobal();

  useEffect(() => {
    async function initSocket() {
      if (!connected.current) {
        console.log("init game socket");
        const s: any = await initializeSocket(auth?.accessToken);
        setSocket(s);
      }
      connected.current = true;
    }
    initSocket();
  }, []);

  return <GameSocket.Provider value={socket}>{children}</GameSocket.Provider>;
}
