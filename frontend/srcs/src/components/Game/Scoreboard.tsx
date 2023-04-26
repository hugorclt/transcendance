import Heptahedre from "../common/Heptahedre/Heptahedre";

function Scoreboard({ team1Score, team2Score }) {
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
        <span style={{ fontFamily: "scoreboard", fontSize: "50px" }}>
          {team1Score}
        </span>{" "}
        -{" "}
        <span style={{ fontFamily: "scoreboard", fontSize: "50px" }}>
          {team2Score}
        </span>
        &nbsp;&nbsp;&nbsp;Team 2
      </div>
      <Heptahedre />
    </>
  );
}

export default Scoreboard;
