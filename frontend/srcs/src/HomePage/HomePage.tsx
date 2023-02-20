import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ChatBar from "../ChatBar/ChatBar";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          navigate("/leaderboards");
        }}
      >
        Go home
      </button>
      <ChatBar />
    </div>
  );
}

export default HomePage;
