import axios from "../axios";
import useAuth from "./useAuth";

function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/auth/refresh");

    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response.data.access_token,
      };
    });
    return response.data.access_token;
  };
  return refresh;
}

export default useRefreshToken;
