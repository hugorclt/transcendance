import React, { CSSProperties } from "react";
import { useState } from "react";
import "../Login.css";
import axios from "../../axios";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGood, setIsGood] = useState(false);
  const [isVisible, setIsVisible] = useState<string>("hidden");

  var handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("auth/register", {
          username: username,
          email: email,
          password: password,
      })
      .then((response) => {
        setUsername("");
        setEmail("");
        setPassword("");
        setIsGood(true);
      })
      .catch((err) => {
        setIsGood(false);
      });
    setIsVisible("visible");
  };

  return (
    <div>
      <form id="form-register" method="post" onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          name="name"
          id="name"
          required
        />
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          name="email"
          id="email"
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
        {isGood ? (
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
        ) : (
          <p
            className="text-red"
            style={
              {
                visibility: isVisible,
                color: "red",
              } as CSSProperties
            }
          >
            Failure! Try again.
          </p>
        )}
        <button form="form-register">Sign Up</button>
      </form>
    </div>
  );
}

export default RegisterForm;
