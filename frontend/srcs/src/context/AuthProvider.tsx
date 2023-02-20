import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";

// export type Auth = {
//   username: string;
//   accessToken: string;
// };

// export type AuthContextInterface = {
//   auth: Auth;
//   setAuth: Dispatch<SetStateAction<Auth>>;
// };

// export const AuthContext = createContext<AuthContextInterface | null>(null);

// type AuthProviderProps = {
//   children: ReactNode;
// };

// export function AuthProvider({ children }: AuthProviderProps) {
//   const [auth, setAuth] = useState<Auth>({
//     username: "",
//     accessToken: "",
//   });

//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

export interface AuthStateInterface {
  username: string;
  accessToken: string;
}

export const AuthContext = createContext({
  auth: {} as Partial<AuthStateInterface>,
  setAuth: {} as Dispatch<SetStateAction<Partial<AuthStateInterface>>>,
});

export const AuthProvider = ({
  children,
  value = {} as AuthStateInterface,
}: {
  children: React.ReactNode;
  value?: Partial<AuthStateInterface>;
}) => {
  const [auth, setAuth] = useState(value);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
