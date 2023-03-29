import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { MouseEvent, useRef, useState } from "react";
import { AuthFormContainer, FormSelector } from "./AuthFormStyle";
import GoogleAuth from "./GoogleAuth/GoogleAuth";
import Icon42 from "./Icons/Icon42";
import LoginForm from "./Form/LoginForm";
import RegisterForm from "./Form/RegisterForm";

function AuthForm() {
  const borderBottomRef = useRef(null);
  const [isRegister, setRegister] = useState(true);
  const [face, setFace] = useState("left");
  const clientId: string = import.meta.env["VITE_GOOGLE_CLIENT_ID"]!;

  const loginClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRegister(true);
    setFace("left");
  };

  const registerClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRegister(false);
    setFace("right");
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
        {isRegister ? <LoginForm /> : <RegisterForm /> }
      </AuthFormContainer>
    </>
  );
}

export default AuthForm;
