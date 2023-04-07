import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { MouseEvent, useState } from "react";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import Icon42 from "../Icons/Icon42";
import LoginForm from "./Form/LoginForm";
import RegisterForm from "./Form/RegisterForm";
import { AuthFormContainer, FormSelector } from "./AuthForm.style";
import SliderMenu from "../../common/SliderMenu/SliderMenu";

function AuthForm() {
  const [isRegister, setRegister] = useState("LOGIN");
  const clientId: string = import.meta.env["VITE_GOOGLE_CLIENT_ID"]!;

  const loginClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRegister("LOGIN");
  };

  const registerClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRegister("REGISTER");
  };

  function isActive() {
    return isRegister
      ? "border-slider"
      : "border-slider border-slider-register";
  }

  return (
    <>
      <AuthFormContainer>
        <SliderMenu
          items={["LOGIN", "REGISTER"]}
          setState={setRegister}
          state={isRegister}
          flex={"space-between"}
        />
        <div className="div-social">
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleAuth />
          </GoogleOAuthProvider>
          <Icon42 />
        </div>
        {isRegister == "LOGIN" ? <LoginForm /> : <RegisterForm />}
      </AuthFormContainer>
    </>
  );
}

export default AuthForm;
