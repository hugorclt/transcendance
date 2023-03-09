import axios from "../services/axios";
import { useGlobal } from "../services/Global/GlobalProvider";

function useRefreshToken() {
  const { setAuth } = useGlobal();

  const refresh = async () => {
    const response = await axios.get("/auth/refresh");

    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response.data.access_token,
        username: response.data.username,
      };
    });
    return response.data.access_token;
  };
  return refresh;
}

export default useRefreshToken;
