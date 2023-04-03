import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { MouseEvent, useState } from "react";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import Icon42 from "../Icons/Icon42";
import LoginForm from "./Form/LoginForm";
import RegisterForm from "./Form/RegisterForm";
import { AuthFormContainer, FormSelector } from "./AuthForm.style";

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
