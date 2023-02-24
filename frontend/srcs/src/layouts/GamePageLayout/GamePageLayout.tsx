import React from "react";
import Game from "../../components/Game/Game";
import GameTest from "../../components/Game/GameTest";
import ChatBar from "../../components/ChatBar/ChatBar";

function GamePageLayout() {
  return (
    <main>
      <div
        className="inline-block align-top box-border"
        style={{ width: "85vw" }}
      >
        {/* <Game /> Temporary component */}
        <GameTest />
      </div>
      <div
        className="inline-block align-top box-border"
        style={{
          width: "15vw",
        }}
      >
        <ChatBar />
      </div>
    </main>
  );
}

export default GamePageLayout;
