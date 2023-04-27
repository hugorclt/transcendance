import { useAtom } from "jotai";
import React, { ReactNode, useContext, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { SocketContext } from "../../services/Auth/SocketContext";
import { updateArray } from "../../services/utils/updateArray";
import { conversationAtom, notifAtom } from "../../services/store";

function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notif, setNotif] = useAtom(notifAtom);
  const axiosPrivate = useAxiosPrivate();
  const socket = useContext(SocketContext);

  /* ------------------------------ first render ------------------------------ */
  useEffect(() => {
    axiosPrivate.get("/invitations").then((res) => {
      console.log(res.data);
      setNotif(res.data);
    });
  }, []);

  /* ------------------------------ socket render ----------------------------- */
  useEffect(() => {
    socket?.on("new-notifs", (newChat) => {
      setNotif((prev) => [...prev, newChat]);
    });

    socket?.on("delete-notifs", (id) => {
      setNotif((prev) => prev.filter((notif) => notif.id !== id))
    });

    return () => {
      socket?.off("on-notifs-update");
    };
  }, [socket]);

  return <>{children}</>;
}

export default NotificationsProvider;
