import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { MouseEvent, useRef, useState } from "react";
import { AuthFormContainer, FormSelector } from "./AuthFormStyle";
import GoogleAuth from "./GoogleAuth/GoogleAuth";
import Icon42 from "./Icons/Icon42";
import LoginForm from "./Form/LoginForm";
import RegisterForm from "./Form/RegisterForm";
import {
  CSSTransition,
  SwitchTransition,
  Transition,
} from "react-transition-group";

const animationsClassNames = {
  enter: "fade-enter",
  enterActive: "fade-enter-active",
  exit: "fade-exit",
  exitActive: "fade-exit-active",
};

function AuthForm() {
  const [isRegister, setRegister] = useState(true);
  const clientId: string = import.meta.env["VITE_GOOGLE_CLIENT_ID"]!;

  const loginClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRegister(true);
  };

  const registerClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRegister(false);
  };

  function isActive() {
    return isRegister
      ? "border-slider"
      : "border-slider border-slider-register";
  }

  return (
    <>
      <AuthFormContainer>
        <FormSelector>
          <button className="button-login" onClick={loginClick}>
            LOGIN
          </button>
          <button className="button-register" onClick={registerClick}>
            REGISTER
          </button>
        </FormSelector>
        <div className="border-bottom">
          <div className={isActive()}></div>
        </div>
        <div className="div-social">
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleAuth />
          </GoogleOAuthProvider>
          <Icon42 />
        </div>
        {isRegister ? <LoginForm /> : <RegisterForm />}
      </AuthFormContainer>
    </>
  );
}

export default AuthForm;
