import React, { createContext, Dispatch } from "react";

const defaultValue = {
  open: false,
  setOpen: () => {},
};

type TModalOpen = {
    open: boolean;
    setOpen: Dispatch<React.SetStateAction<boolean>>;
};

export const RoomModalOpenContext = createContext<TModalOpen>(defaultValue);
