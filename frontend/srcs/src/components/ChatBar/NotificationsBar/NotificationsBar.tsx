import React, { useContext, useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IconContext } from "react-icons/lib";
import { StatusContext } from "../../../statusPageContext";
import NotificationsMessage from "./NotificationsMessage";

function NotificationsBar() {
  const [dropUp, setDropUp] = useState(false);
  const [notifList, setNotifList] = useState<string[]>([]);
  const socket = useContext(StatusContext);

  const handleClick = () => {
    setDropUp(!dropUp);
  };

  useEffect(() => {
    socket?.on("on-friend-request", (username) => {
      setNotifList((prev) => [...prev, username]);
    });

    return () => {
      socket?.off("on-friend-request");
    };
  }, [socket]);

  return (
    <div>
      {dropUp && (
        <div className="absolute inset-x-0 bottom-16 w-full">
          <li className="list-none">
            {notifList.map((val) => {
              return <NotificationsMessage username={val} />;
            })}
          </li>
        </div>
      )}
      <div
        style={{ borderColor: "#E8C47C" }}
        className="absolute inset-x-0 bottom-0 p-4 border">
        <div onClick={handleClick}>
          <IconContext.Provider value={{ color: "#E8C47C" }}>
            <IoIosNotificationsOutline size="24"></IoIosNotificationsOutline>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default NotificationsBar;
