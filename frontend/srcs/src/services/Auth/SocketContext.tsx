import React, {
  createContext,
  useRef,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { io, Socket } from "socket.io-client";
import { useGlobal } from "../../services/Global/GlobalProvider";

async function initializeSocket(token: string) {
  try {
    const socket = io("http://localhost:3000/socials", {
      auth: {
        jwt: token,
      },
    });
    return socket;
  } catch (err: any) {
    console.log("Error Connecting socket: ", err);
  }
}

export const SocketContext = createContext<Socket | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const connected = useRef(false);
  const { auth } = useGlobal();

  useEffect(() => {
    async function initSocket() {
      if (!connected.current) {
        console.log("init socket");
        console.log(auth);
        const s: any = await initializeSocket(auth?.accessToken);
        setSocket(s);
      }
      connected.current = true;
    }
    initSocket();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
