import { useContext } from "react";
import { AuthContext } from "../services/Auth/AuthProvider";

export const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
