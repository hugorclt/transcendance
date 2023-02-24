import React from "react";
import GameTest from "../../components/Game/GameTest";
import GamePageLayout from "../../layouts/GamePageLayout/GamePageLayout";
import {
  socket,
  WebSocketGameProvider,
} from "../../services/WebSocket/WebsocketGameContext";

function GamePage() {
  return (
    <WebSocketGameProvider value={socket}>
      <GamePageLayout />
    </WebSocketGameProvider>
  );
}

export default GamePage;
