import { useAtom } from "jotai";
import React from "react";
import { lobbyAtom } from "../../../../services/store";

function GameInfoCard() {
  const [lobby, setLobby] = useAtom(lobbyAtom);

  return (
    <>
      <h3>MODE {lobby.mode}</h3>
      <h4>
        {lobby.nbPlayers / 2} vs {lobby.nbPlayers / 2}
      </h4>
    </>
  );
}

export default GameInfoCard;
