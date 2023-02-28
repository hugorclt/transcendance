import React, { createContext, Dispatch } from "react";

const defaultValue = {
  openChat: [],
  setOpenChat: () => {},
};

type TLoginPageContext = {
  openChat: string[];
  setOpenChat: Dispatch<React.SetStateAction<string[]>>;
};

export const ChatContext = createContext<TLoginPageContext>(defaultValue);
