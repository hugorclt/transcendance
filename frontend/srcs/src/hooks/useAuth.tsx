import { useContext } from "react";
import { AuthContext } from "../services/AuthProvider";

export const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
