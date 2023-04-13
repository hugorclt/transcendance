import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import React, { ReactNode, useContext, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { lobbyAtom, lobbyDefaultValue, userAtom } from "../../services/store";
import { LobbySocketContext } from "../../services/Lobby/LobbySocketContext";
import { updateArray } from "../../services/utils/updateArray";
import { TLobbyMember } from "../../services/type";
import { useNavigate } from "react-router";

function LobbyProvider({ children }: { children: ReactNode }) {
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const [user, setUser] = useAtom(userAtom);
  const socket = useContext(LobbySocketContext);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    axiosPrivate
      .get("lobbies/current-lobby")
      .then((res: AxiosResponse) => {
        setLobby((prev) => ({ ...prev, ...res.data }));
      })
      .catch((err: AxiosError) => {
        console.log("Error while fetching lobby");
        setLobby(lobbyDefaultValue);
      });
  }, []);

  useEffect(() => {
    socket?.on("user-joined-lobby", (userJoining) => {
      setLobby((prev) => ({
        ...prev,
        members: updateArray(prev.members, {
          id: userJoining.memberId,
          userId: userJoining.userId,
          team: userJoining.team,
          ready: userJoining.ready,
          user: {
            username: userJoining.username,
          },
        }),
      }));
    });
    socket?.on("user-left-lobby", (userLeaving) => {
      if (user.id == userLeaving.userId) {
        setLobby(lobbyDefaultValue);
      } else {
        setLobby((prev) => ({
          ...prev,
          members: prev.members.filter(
            (member: TLobbyMember) => member.userId !== userLeaving.userId
          ),
        }));
      }
    });
    socket?.on("on-member-update", (member) => {
      setLobby((prev) => ({
        ...prev,
        members: updateArray(prev.members, member),
      }));
    });
    socket?.on("on-lobby-update", (lobby) => {
      setLobby((prev) => ({ ...prev, ...lobby }));
    });
    socket?.on("redirect-to-game", () => {
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

  return <>{children}</>;
}

export default LobbyProvider;
