import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "./useAxiosPrivate";

const useId = async () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  if (localStorage.getItem("id") != null) {
    return localStorage.getItem("id");
  } else {
    try {
      const res : AxiosResponse = await axiosPrivate.get("/auth/me");
      localStorage.setItem("key", res.data.id);
      return res.data.id;
    } catch(err) {
      navigate("/login", { replace: true });
      return ("");
    }
  }
};

export default useId;
