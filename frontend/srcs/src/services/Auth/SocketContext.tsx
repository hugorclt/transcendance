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
import { AxiosResponse } from "axios";

// async function initializeSocket(axiosPrivate: any, token: string) {
//   try {
//     const socket = io("http://localhost:3000/status", {
//       auth: {
//         jwt: token,
//       },
//     });
//     return socket;
//   } catch (err: any) {
//     console.log("Error Connecting socket: ", err);
//   }
// }

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

export const SocketContext = createContext<Socket | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const axiosPrivate = useAxiosPrivate();
  const connected = useRef(false);
  const { auth } = useGlobal();

  useEffect(() => {
    async function initSocket() {
      if (!connected.current) {
        console.log("init socket");
        console.log(auth);
        const s: any = await initializeSocket(axiosPrivate, auth?.accessToken);
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
