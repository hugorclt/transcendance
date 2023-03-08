import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
  useContext,
} from "react";

export type Auth = {
  username: string;
  accessToken: string;
};

export type GlobalStateInterface = {
  auth: Auth;
  setAuth: Dispatch<SetStateAction<Auth>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
};

const defaultState = {
  auth: {
    username: "",
    accessToken: "",
  },
  setAuth: () => {},
  status: "",
  setStatus: () => {},
} as GlobalStateInterface;

export const GlobalContext = createContext<GlobalStateInterface>(defaultState);

type GlobalProviderProps = {
  children: ReactNode;
};

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [auth, setAuth] = useState<Auth>({
    username: "",
    accessToken: "",
  });
  const [status, setStatus] = useState<string>("");

  return (
    <GlobalContext.Provider value={{ auth, setAuth, status, setStatus }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobal = () => useContext(GlobalContext);

export default GlobalProvider;
