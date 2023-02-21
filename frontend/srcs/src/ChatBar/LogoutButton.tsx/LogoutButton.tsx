import React, { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { IconContext } from "react-icons/lib";
import { AxiosResponse, AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function LogoutButton() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const axios = useAxiosPrivate();

  function logout() {
    axios
      .get("/auth/logout")
      .then((response: AxiosResponse) => {
        navigate("/login", { replace: true });
      })
      .catch((error: AxiosError) => {
        if (!error?.response) {
          setErrMsg("No server response");
        } else if (error.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
        setSuccess(false);
      });
  }

  return (
    <button onClick={logout}>
      <IconContext.Provider value={{ color: "white" }}>
        <HiOutlineLogout />
      </IconContext.Provider>
    </button>
  );
}

export default LogoutButton;
