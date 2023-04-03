import React from "react";
import Heptahedre from "../../components/common/Heptahedre/Heptahedre";
import {
  LoginHeaderContainer,
  LoginLayoutContainer,
} from "./LoginLayout.style";
import AuthForm from "../../components/Login/AuthForm/AuthForm";

function LoginLayout() {
  return (
    <>
      <LoginLayoutContainer>
        <LoginHeaderContainer>
          <Heptahedre />
          <h1>
            PONG
            <br />
            CHAMPIONS
          </h1>
        </LoginHeaderContainer>
        <AuthForm />
      </LoginLayoutContainer>
    </>
  );
}

export default LoginLayout;
