import { useAtom } from "jotai";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { lobbyAtom, userAtom } from "../../services/store";
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
      console.log("init socket lobby");
      const s: any = await initializeSocket(axiosPrivate, user?.accessToken);
      setSocket(s);
    }
    initSocket();
  }, []);

  useEffect(() => {
    socket?.on("user-joined-lobby", (user) => {
      console.log("user-joined-lobby", user);
      setLobby((prev?) => ({
        ...prev,
        members: updateArray(prev.members, {
          id: user.memberId,
          userId: user.userId,
          team: user.team,
          ready: user.ready,
          user: {
            username: user.username,
          },
        }),
      }));
    });
    socket?.on("user-left-lobby", (user) => {
      console.log("user-left-lobby", user);
      setLobby((prev?) => ({
        ...prev,
        members: prev.members.filter(
          (member: TLobbyMember) => member.userId !== user.userId
        ),
      }));
    });
    socket?.on("on-member-update", (member) => {
      console.log("on-member-update", member);
      setLobby((prev) => ({
        ...prev,
        members: updateArray(prev.members, member),
      }));
    });
    socket?.on("on-lobby-update", (lobby) => {
      console.log("lobby updated: ", lobby);
      setLobby(lobby);
    });
    socket?.on("redirect-to-game", () => {
      console.log("redirect-to-game");
      navigate("/game");
    });
    return () => {
      socket?.off("user-joined-lobby");
      socket?.off("user-left-lobby");
      socket?.off("on-member-update");
      socket?.off("on-lobby-update");
      socket?.off("redirect-to-game");
    };
  }, [socket]);

  return (
    <LobbySocketContext.Provider value={socket}>
      {children}
    </LobbySocketContext.Provider>
  );
}
