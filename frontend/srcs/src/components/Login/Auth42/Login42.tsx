import React, { useEffect, useRef } from "react";
import axios from "../../../services/axios";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../../Loading/Loading";

function Login42() {
  const queryParameters = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; //where the user came from, if we can't get it, root
  const querySent = useRef(false);

  useEffect(() => {
    if (!querySent.current) {
      const code = queryParameters.get("code");
      axios
        .post("/auth/42/login", {
          code: code,
        })
        .then((res: AxiosResponse) => {
          navigate(from, { replace: true });
        })
        .catch((err: AxiosError) => {
          navigate("/login", { replace: true });
        });
    }
    querySent.current = true;
  }, []);

  return (
    <div>
      <Loading />
    </div>
  );
}

export default Login42;
