import React, { createContext, Dispatch } from "react";

const defaultValue = {
  isActive: true,
  setIsActive: () => {},
};

type TCreateRoomContext = {
  isActive: boolean;
  setIsActive: Dispatch<React.SetStateAction<boolean>>;
};

export const CreateRoomContext = createContext<TCreateRoomContext>(defaultValue);
