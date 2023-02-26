import React, { createContext, Dispatch } from "react";

const defaultValue = {
  isSignIn: true,
  setIsSignIn: () => {},
};

type TLoginPageContext = {
  isSignIn: boolean;
  setIsSignIn: Dispatch<React.SetStateAction<boolean>>;
};

export const LoginPageContext = createContext<TLoginPageContext>(defaultValue);
