import React, { createContext } from 'react';
import {io, Socket} from 'socket.io-client';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { AxiosResponse } from 'axios';

async function initializeSocket(axiosPrivate: any) {
    try {
      const res: AxiosResponse = await axiosPrivate.get("auth/me");
      const userId = res.data.id;
      const socket = io('http://localhost:3000/game', {
        query: { userId },
      });
      return (socket);
    } catch (err: any) {
      console.log("Error fetching user ID: ", err);
    }
  }
  
  export const GameContext = createContext<Socket | null>(null);
  
  export function GameProvider({ children }: { children: React.ReactNode }) {
    const [socket, setSocket] = React.useState<Socket | null>(null);
    const axiosPrivate = useAxiosPrivate();
  
    //we could use UseRef to avoid double socket init upon component loading
    React.useEffect(() => {
      async function initSocket() {
        const s : any = await initializeSocket(axiosPrivate);
        setSocket(s);
      }
      initSocket();
    }, []);
  
    return (
      <GameContext.Provider value={socket}>
        {children}
      </GameContext.Provider>
    );
  }