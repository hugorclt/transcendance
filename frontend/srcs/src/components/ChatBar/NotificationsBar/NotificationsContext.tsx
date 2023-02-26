import React, { createContext, Dispatch } from "react";

const defaultValue = {
  notifList: [],
  setNotifList: () => {},
};

type TNotifs = {
  notifList: string[];
  setNotifList: Dispatch<React.SetStateAction<string[]>>;
};

export const NotifListContext = createContext<TNotifs>(defaultValue);
