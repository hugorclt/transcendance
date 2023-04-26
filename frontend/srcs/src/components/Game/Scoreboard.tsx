import React, { useState, useEffect } from "react";
import Heptahedre from "../common/Heptahedre/Heptahedre";

function Score({ value, blink }) {
  return (
    <span
      style={{
        fontFamily: "scoreboard",
        fontSize: "50px",
        animation: blink ? "blink 1s linear 0s 3" : "none",
      }}
    >
      {value}
    </span>
  );
}

function Scoreboard({ team1Score, team2Score }) {
  const [scoreChanged, setScoreChanged] = useState(false);

  useEffect(() => {
    if (scoreChanged) {
      const blinkInterval = setInterval(() => {
        setScoreChanged(false);
      }, 1000);
      return () => clearInterval(blinkInterval);
    }
  }, [scoreChanged]);

  useEffect(() => {
    setScoreChanged(true);
  }, [team1Score, team2Score]);

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
        }}
      >
        Team 1&nbsp;&nbsp;&nbsp;
        <Score value={team1Score} blink={scoreChanged} />
        {" "} - {" "}
        <Score value={team2Score} blink={scoreChanged} />
        &nbsp;&nbsp;&nbsp;Team 2
      </div>
      <Heptahedre/>
    </>
  );
}

export default Scoreboard;
