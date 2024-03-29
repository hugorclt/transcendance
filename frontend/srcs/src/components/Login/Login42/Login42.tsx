import React, { useEffect, useRef } from "react";
import axios from "../../../services/axios";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../../services/store";

function Login42() {
  const queryParameters = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; //where the user came from, if we can't get it, root
  const querySent = useRef(false);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (!querySent.current) {
      const code = queryParameters.get("code");
      axios
        .post("/auth/42/login", {
          code: code,
          id: user.id,
        })
        .then((response: AxiosResponse) => {
          if (response.data.is2fa == true) {
            setUser((prev) => ({
              ...prev,
              ...response.data,
            }));
            navigate("/login/2fa", { replace: true });
          } else {
            const accessToken = response?.data.access_token;
            setUser((prev) => ({
              ...prev,
              accessToken: accessToken,
            }));
            navigate(from, { replace: true });
          }
        })
        .catch((err: AxiosError) => {
          navigate("/login", { replace: true });
        });
    }
    querySent.current = true;
  }, []);

  return <h1>Loading...</h1>;
}

export default Login42;
