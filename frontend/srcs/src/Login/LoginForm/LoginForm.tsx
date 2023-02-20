import React, { CSSProperties, useState } from "react";
import axios from "../../axios";
import "../Login.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { useAuth } from "../../hooks/useAuth";

function LoginForm() {
  const { setAuth } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [isVisible, setIsVisible] = useState<string>("hidden");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; //where the user came from, if we can't get it, root

  const userRef = useRef(document.createElement("input"));
  const errRef = useRef(document.createElement("input"));

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  //----- DEFINING SUCCESS/ERROR MESSAGE ON SUBMIT -----
  const SubmitNote = () => {
    if (success) {
      return (
        <p
          className="text-green"
          style={
            {
              visibility: isVisible,
              color: "green",
            } as CSSProperties
          }
        >
          Login Success!
        </p>
      );
    } else {
      return (
        <p
          className="text-red"
          style={
            {
              visibility: isVisible,
              color: "red",
            } as CSSProperties
          }
        >
          {errMsg}
        </p>
      );
    }
  };

  //--- HANDLE SUBMIT ---
  var handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("/auth/login", {
        username: username,
        password: password,
      })
      .then((response: AxiosResponse) => {
        setSuccess(true);
        setIsVisible("visible");
        const accessToken = response?.data?.access_token;
        console.log("accessToken = ", accessToken);
        console.log("username = ", username);
        setAuth({ username, accessToken });
        setUsername("");
        setPassword("");
        navigate(from, { replace: true } );
      })
      .catch((error: AxiosError) => {
        if (!error?.response) {
          setErrMsg("No server response");
        } else if (error.response?.status === 400) {
          setErrMsg("Missing username or password");
        } else if (error.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
        errRef.current.focus();
        setSuccess(false);
        setIsVisible("visible");
      });
  };

  //===== Rendering =====
  return (
    <div>
      <form id="form-login" method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
        <input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          name="password"
          id="password"
          required
        />
        <SubmitNote />
        <button form="form-login">Sign In</button>
      </form>
    </div>
  );
}

export default LoginForm;
