import { useAtom } from "jotai";
import axios from "../services/axios";
import { userAtom } from "../services/store";

function useRefreshToken() {
  const [user, setUser] = useAtom(userAtom);

  const refresh = async () => {
    console.log("Refreshing token");
    const response = await axios.get("/auth/refresh");

    setUser((prev) => ({
      ...prev,
      username: response.data.username,
      accessToken: response.data.access_token,
    }));
    return response.data.access_token;
  };
  return refresh;
}

export default useRefreshToken;
