import React, { MouseEvent, useRef, useState } from "react";
import { AuthFormContainer, FormSelector } from "./AuthFormStyle";
import GoogleAuth from "./GoogleAuth/GoogleAuth";
import Icon42 from "./Icons/Icon42";
import LoginForm from "./SignIn/LoginForm/LoginForm";
import RegisterForm from "./SignUp/RegisterForm/RegisterForm";

function AuthForm() {
  const borderBottomRef = useRef(null);
  const [isRegister, setRegister] = useState(true);

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
          <GoogleAuth />
          <Icon42 />
        </div>
        {isRegister ? <LoginForm /> : <RegisterForm />}
      </AuthFormContainer>
    </>
  );
}

export default AuthForm;
