import React, { useContext } from "react";
import { LoginPageContext } from "../../../views/LoginPage/LoginPageContext";

function MovingPanel() {
  const { isSignIn, setIsSignIn } = useContext(LoginPageContext);

  var handleClick = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>Ping</p>
          <button className="ghost" id="signIn" onClick={handleClick}>
            Sign In
          </button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start playing now!</p>
          <button className="ghost" id="signUp" onClick={handleClick}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovingPanel;
