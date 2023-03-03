import React, { createContext, Dispatch } from "react";

const defaultValue = {
  selectedMode: 0,
  setSelectedMode: () => {},
};

type TLobbyPageContext = {
  selectedMode: number;
  setSelectedMode: Dispatch<React.SetStateAction<number>>;
};

export const LobbyContext = createContext<TLobbyPageContext>(defaultValue);
