import "./Login.css";
import { useState } from "react";
import Signup from "./Signup";
import Signin from "./Signin";

function Login() {
  const [isSignUp, setSignUp] = useState(true);

  return (
    <div className="login-body flex flex-col justify-center items-center h-screen">
      <div
        className={
          isSignUp === false
            ? "transition duration-250 hover:scale-110 container right-panel-active"
            : "transition duration-250 hover:scale-110 container"
        }
        id="container"
      >
        <Signup />
        <Signin />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>Ping</p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => setSignUp(true)}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start playing now!</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => setSignUp(false)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
