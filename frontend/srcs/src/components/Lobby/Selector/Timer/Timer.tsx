import React, { useContext, useEffect, useState } from "react";
import { LobbySocketContext } from "../../../../services/Lobby/LobbySocketContext";

function Timer() {
  const socket = useContext(LobbySocketContext);
  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    socket?.on("time-to-choose", (seconds) => {
      setSeconds(seconds);
    });

    return () => {
      socket?.off("time-to-choose");
    }
  }, [socket]);
  return <p>{seconds}</p>;
}

export default Timer;
