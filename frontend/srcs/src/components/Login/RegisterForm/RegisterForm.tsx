import { useRef, useState, useEffect } from "react";
import React, { CSSProperties } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Login.css";
import axios from "../../../services/axios";

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-z0-9._+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/;
const REGISTER_URL = "auth/register";

function RegisterForm() {
  const userRef = useRef(document.createElement("input")); //explains to typescript that this will have a type
  const errRef = useRef(document.createElement("input"));

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false); //whether name validates regex or not
  const [usernameFocus, setUsernameFocus] = useState(false); //whether we have focus on the field or not
  let usernameNote;

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  let emailNote;

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  let passwordNote;

  const [errMsg, setErrMsg] = useState(""); //error inside form ?
  const [success, setSuccess] = useState(false); //success submitting form ?

  const [isVisible, setIsVisible] = useState<string>("hidden");

  //--- PUTS FOCUS ON USERNAME ON COMPONENT LOADING ---
  useEffect(() => {
    userRef.current.focus();
  }, []);

  //--- CHECK USERNAME REGEX VALIDITY ---
  useEffect(() => {
    const result = USERNAME_REGEX.test(username);
    setValidName(result);
  }, [username]);

  //--- CHECK PASSWORD REGEX VALIDITY ---
  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

  //--- CHECK EMAIL REGEX VALIDITY ---
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  //--- DISPLAY ERROR MESSAGE ---
  useEffect(() => {
    setErrMsg("");
  }, [username, password, email]);

  //----- DEFINING INFORMATIVE NOTES ABOUT FIELD FORMATS -----
  //==> usernameNote
  if (username && !validName && usernameFocus) {
    usernameNote = (
      <p id="usernameNote" className="usernameNote">
        <FontAwesomeIcon icon={faInfoCircle} />4 to 24 characters. Must begin
        with a letter. <br />
        Letters, numbers, underscores, hyphens allowed.
      </p>
    );
  }

  //==> passwordNote
  if (password && !validPassword && passwordFocus) {
    passwordNote = (
      <p id="passwordNote" className="passwordNote">
        <FontAwesomeIcon icon={faInfoCircle} />
        8 to 24 characters.
        <br />
        Must include uppercase and lowercase letters, a number and a special
        character.
        <br />
        Allowed special characters: <span aria-label="exclamation mark">
          !
        </span>{" "}
        <span aria-label="at symbol">@</span>{" "}
        <span aria-label="hashtag">#</span>{" "}
        <span aria-label="dollar sign">$</span>{" "}
        <span aria-label="percent">%</span>
      </p>
    );
  }

  //==> emailNote
  if (email && !validEmail && emailFocus) {
    emailNote = (
      <p id="emailNote" className="emailNote">
        <FontAwesomeIcon icon={faInfoCircle} />
        Must contain @ and . with non valid domain
        <br />
        Letters, numbers, underscores, hyphens, plus allowed.
      </p>
    );
  }

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
    //handle wrong fields in form?
    axios
      .post(REGISTER_URL, {
        username: username,
        email: email,
        password: password,
      })
      .then(function (response: any) {
        setUsername("");
        setEmail("");
        setPassword("");
        setSuccess(true);
        setIsVisible("visible");
      })
      .catch(function (error: any) {
        if (!error?.response) {
          setErrMsg("No server response");
        } else if (error.response?.status === 409) {
          setErrMsg("Username or Email already in use");
        } else {
          setErrMsg("Registration failed");
        }
        setIsVisible("vicible");
        setSuccess(false);
        errRef.current.focus();
      });
  };

  return (
    <div>
      <form id="form-register" method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          ref={userRef}
          data-autocomplete="off"
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
          name="username"
          onFocus={() => setUsernameFocus(true)}
          onBlur={() => setUsernameFocus(false)}
        />
        {usernameNote}
        <input
          type="email"
          placeholder="Email"
          id="email"
          data-autocomplete="off"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          required
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        {emailNote}
        <input
          type="password"
          placeholder="Password"
          id="password"
          data-autocomplete="off"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          required
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        {passwordNote}
        <SubmitNote />
        <button form="form-register">Sign Up</button>
      </form>
    </div>
  );
}

export default RegisterForm;
