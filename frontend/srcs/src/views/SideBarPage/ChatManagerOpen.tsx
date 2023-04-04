import React, { createContext, Dispatch } from "react";

const defaultValue = {
  openManager: true,
  setOpenManager: () => {},
};

type TOpenChatManager = {
  openManager: boolean;
  setOpenManager: Dispatch<React.SetStateAction<boolean>>;
};

export const ChatManagerOpen = createContext<TOpenChatManager>(defaultValue);
