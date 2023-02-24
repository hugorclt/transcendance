import React, { useEffect, useContext } from "react";
import { WebSocketGameContext } from "../../services/WebSocket/WebsocketGameContext";

export const GameTest = () => {
  const socket = useContext(WebSocketGameContext);

  useEffect(() => {
    console.log("game component mounted");
    console.log(socket.id);
    socket.on("connect", () => {
      console.log("Connected to game socket!");
    });
    socket.on("game", (data) => {
      console.log("game event received: ", data);
    });

    //cleanup function on component dismount
    return () => {
      console.log("Unregistering events ... ");
      socket.off("connect"); // Unregister connect event
      socket.off("game"); // Unregister game event
    };
  }, []);

  return (
    <div>
      <div>
        <h1>Game Test Component</h1>
      </div>
    </div>
  );
};

export default GameTest;
