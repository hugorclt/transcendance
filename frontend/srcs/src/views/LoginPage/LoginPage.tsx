import React, { useState } from "react";
import LoginLayout from "../../layouts/LoginLayout/LoginLayout";
import { LoginPageContext } from "../../views/LoginPage/LoginPageContext";

function LoginPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <LoginPageContext.Provider value={{ isSignIn, setIsSignIn }}>
      <LoginLayout />
    </LoginPageContext.Provider>
  );
}

export default LoginPage;
