import React, {
  createContext,
  useRef,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { io, Socket } from "socket.io-client";
import { userAtom } from "../store";
import { useAtom } from "jotai";

async function initializeSocket(token: string) {
  try {
    const socket = await io("http://localhost:3000/socials", {
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
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    socket?.on("unauthorized", () => {
      console.log("user socket unauthorized");
      //TODO: get another token
    });

    return () => {
      socket?.off("unauthorized");
    };
  }, [socket]);

  useEffect(() => {
    async function initSocket() {
      if (!connected.current) {
        const s: any = await initializeSocket(user?.accessToken);
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
