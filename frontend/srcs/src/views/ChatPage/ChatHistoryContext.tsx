import React, { createContext, Dispatch } from "react";

export type TChatHistoryType = {
  name: string,
  avatar: string,
  lastMessage: string,
}

const defaultValue = {
  chatHistory: [],
  setChatHistory: () => {},
};

type TChatHistoryContext = {
  chatHistory: TChatHistoryType[];
  setChatHistory: Dispatch<React.SetStateAction<TChatHistoryType[]>>;
};

export const ChatHistoryContext = createContext<TChatHistoryContext>(defaultValue);
