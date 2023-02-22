import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";

export type Auth = {
  username: string;
  accessToken: string;
};

export type AuthStateInterface = {
  auth: Auth;
  setAuth: Dispatch<SetStateAction<Auth>>;
};

const defaultState = {
  auth: {
    username: "",
    accessToken: "",
  },
  setAuth: (auth: Auth) => {},
} as AuthStateInterface;

export const AuthContext = createContext<AuthStateInterface>(defaultState);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<Auth>({
    username: "",
    accessToken: "",
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
