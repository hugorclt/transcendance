import React, { useContext } from "react";
import { LoginPageContext } from "../../views/LoginPage/LoginPageContext";
import Signin from "./SignIn/Signin";
import Signup from "./SignUp/Signup";
import "./Login.css";
import MovingPanel from "./MovingPanel/MovingPanel";

function Login() {
  const { isSignIn } = useContext(LoginPageContext);

  return (
    <div className="login-body flex flex-col justify-center items-center h-screen">
      <div
        className={
          !isSignIn
            ? "transition duration-250 hover:scale-110 container right-panel-active"
            : "transition duration-250 hover:scale-110 container"
        }
        id="container"
      >
        <MovingPanel />
        <Signup />
        <Signin />
      </div>
    </div>
  );
}

export default Login;
