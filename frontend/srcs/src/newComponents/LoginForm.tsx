import React, { CSSProperties, useState } from "react";
import { AxiosResponse, AxiosError } from "axios";
import axios from "../axios";
import "../Login/Login.css";
import { useNavigate } from "react-router";
import { useRef, useEffect } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [isGood, setIsGood] = useState(false);
  const [isVisible, setIsVisible] = useState<string>("hidden");
  const navigate = useNavigate();

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
          Success, try to connect!
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
      .then((res: AxiosResponse) => {
        setUsername("");
        setPassword("");
        setIsGood(true);
        setIsVisible("visible");
        navigate("/");
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          setIsGood(false);
          setIsVisible("visible");
        }
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
        <button form="form-login">Sign Up</button>
      </form>
    </div>
  );
}

export default LoginForm;
