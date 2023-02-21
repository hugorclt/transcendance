import React, { useEffect } from 'react'
import axios from '../../axios'
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from '../../Loading/Loading';


function Login42() {
    const queryParameters = new URLSearchParams(window.location.search)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"; //where the user came from, if we can't get it, root

    useEffect(() => {
        const code = queryParameters.get("code")
        axios.post("/auth/login/42", {
            code: code,
        }).then((res: AxiosResponse) => {
            navigate(from, { replace: true });
        }).catch((err: AxiosError) => {
            console.log("Error from server")
            navigate("/login", { replace: true });
        })
    }, [])

  return (
    <div>
        <Loading />
    </div>
  )
}

export default Login42