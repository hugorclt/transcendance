import { GoogleOAuthProvider } from "@react-oauth/google";
import React, {MouseEvent} from "react";
import GoogleAuth from "../../GoogleAuth/GoogleAuth";
import { TFormTopperProps } from "./TFormTopper";
import { FormSelector } from "../AuthForm.style";
import Icon42 from "../../Icons/Icon42";

function FormTopper({ clientId, isRegister, setIsRegister }: TFormTopperProps) {
  const loginClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsRegister(true);
  };

  const registerClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsRegister(false);
  };

  function isActive() {
    return isRegister
      ? "border-slider"
      : "border-slider border-slider-register";
  }

  return (
    <>
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
    </>
  );
}

export default FormTopper;
