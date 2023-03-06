import React from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
import { Navigate, useNavigate } from "react-router-dom";
import ChatBar from "../../layouts/ChatBarLayout/ChatBarLayout";
import Games from "../Game/Game";
>>>>>>> hugo

function Home() {
  const navigate = useNavigate();

<<<<<<< HEAD
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
=======
  return <div>HomePage</div>;
>>>>>>> hugo
}

export default Home;
