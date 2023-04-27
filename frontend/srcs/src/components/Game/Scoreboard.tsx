import React, { useState, useEffect, useContext } from "react";
import Heptahedre from "../common/Heptahedre/Heptahedre";
import { LobbySocketContext } from "../../services/Lobby/LobbySocketContext";

function Score({ value, blink }) {
  return (
    <span
      style={{
        fontFamily: "scoreboard",
        fontSize: "50px",
        animation: blink ? "blink 1s linear 0s 3" : "none",
      }}>
      {value}
    </span>
  );
}

function Scoreboard() {
  const [scoreChanged, setScoreChanged] = useState(false);
  const socket = useContext(LobbySocketContext);
  const [team1score, setTeam1score] = useState(0);
  const [team2score, setTeam2score] = useState(0);

useEffect(() => {
  if (scoreChanged === true) {
    const blinkTimeout = setTimeout(() => {
      setScoreChanged(false);
    }, 1000);
    return () => clearTimeout(blinkTimeout);
  }
});

  useEffect(() => {
    socket?.on("frame", (frame) => {
      if (team1score != frame.score.team1 || team2score != frame.score.team2) {
        setTeam1score(frame.score.team1);
        setTeam2score(frame.score.team2);
        setScoreChanged(true);
      }
    });

    return () => {
      socket?.off("frame");
    }
  }, [socket]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          zIndex: "1",
          fontFamily: "scoreboard",
          color: "white",
          fontSize: "21px",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}>
        Team 1&nbsp;&nbsp;&nbsp;
        <Score value={team1score} blink={scoreChanged} /> -{" "}
        <Score value={team2score} blink={scoreChanged} />
        &nbsp;&nbsp;&nbsp;Team 2
      </div>
      <Heptahedre />
    </>
  );
}

export default Scoreboard;
