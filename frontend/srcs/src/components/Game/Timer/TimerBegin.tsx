import React, { useContext, useEffect, useState } from "react";
import { LobbySocketContext } from "../../../services/Lobby/LobbySocketContext";
import { TimerContainer } from "./Timer.style";

function TimerBegin() {
  const socket = useContext(LobbySocketContext);
  const [timer, setTimer] = useState();
  const [opacity, setOpacity] = useState(1);
  const [go, setGo] = useState("");

  useEffect(() => {
    socket?.on("game-start-timer", (seconds) => {
      if (seconds == 1)
        setGo("GO")
      setTimer(seconds);
    });

    socket?.on("game-start-end-timer", () => {
      setOpacity(0);
    })

    return () => {
      socket?.off("game-start-timer");
      socket?.off("game-start-end-timer");
    };
  }, [socket, timer]);

  return (
    <TimerContainer style={{opacity: opacity}}>
      <h1>{go.length != 0 ? go : timer}</h1>
    </TimerContainer>
  );
}

export default TimerBegin;
