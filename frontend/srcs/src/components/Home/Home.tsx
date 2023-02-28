import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  function handleClickGame() {
    navigate("/game");
  }
  function handleClickLobby() {
    navigate("/lobby");
  }

  return (
    <div>
      Home
      <br />
      <button type="button" onClick={handleClickGame}>
        Play
      </button>
      <br />
      <button type="button" onClick={handleClickLobby}>
        Lobby
      </button>
    </div>
  );
}

export default Home;
