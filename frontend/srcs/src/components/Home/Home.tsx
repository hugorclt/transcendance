import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/game");
  }

  return (
    <div>
      Home
      <br />
      <button type="button" onClick={handleClick}>
        Play
      </button>
    </div>
  );
}

export default Home;
