import { createContext, useState } from "react";

const AuthContext = createContext({} as any);

export const AuthProvider = ({ children }: { children: any }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
