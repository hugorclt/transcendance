import React, { useState } from "react";
import Login from "../../components/Login/Login";
import LoginLayout from "../../layouts/LoginLayout/LoginLayout";
import { LoginPageContext } from "../../views/LoginPage/LoginPageContext";

function LoginPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <LoginPageContext.Provider value={{ isSignIn, setIsSignIn }}>
      <LoginLayout>
        <Login />
      </LoginLayout>
    </LoginPageContext.Provider>
  );
}

export default LoginPage;
