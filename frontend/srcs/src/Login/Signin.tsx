import React, { CSSProperties, useState } from "react";
import "./Login.css";
import LoginForm from "./LoginForm/LoginForm";
import Icon42 from "./Icon42";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import axios from "../axios";
import Cookies from "js-cookie";

function Signin() {
  const [isVisible, setIsVisible] = useState("none");
  const [isGood, setGood] = useState(true);

  const clientId: string = process.env["REACT_APP_GOOGLE_CLIENT_ID"]!;

  return (
    <div>
      <div className="form-container sign-in-container">
        <h1>Sign in</h1>
        <div className="social-container">
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
              onSuccess={async (credentialResponse: CredentialResponse) => {
                const response = await axios.post("/auth/google/login", {
                  credential: credentialResponse.credential,
                });
                setGood(true);
                setIsVisible('block');
                const data = response.data;

                Cookies.set("authData", data);
                console.log(credentialResponse);
              }}
              onError={() => {
                setGood(false);
                setIsVisible('block');
              }}
            />
          </GoogleOAuthProvider>
          <a href="http://localhost:3000/auth/google/login" className="social">
            <Icon42 />
          </a>
        </div>
        {isGood ? (
          <p
            className="text-green"
            style={
              {
                display: isVisible,
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
                display: isVisible,
                color: "red",
              } as CSSProperties
            }
          >
            Failure! Try again.
          </p>
        )}
        <span>or use your account</span>
        <LoginForm />
      </div>
    </div>
  );
}

export default Signin;
